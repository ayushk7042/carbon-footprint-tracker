import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchEmissions = async () => {
      const token = localStorage.getItem("token");
      try {
        const userRes = await axios.post(
          "http://localhost:5000/api/auth/auth",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!userRes.data) {
          return;
        }
        setUser(userRes.data.user);

        const res = await axios.get("http://localhost:5000/api/emissions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formatted = res.data
          .map((entry) => ({
            date: new Date(entry.createdAt).toLocaleDateString(),
            emissions: entry.totalEmissions,
          }))
          .reverse();
        setData(formatted);
      } catch (err) {
        console.error("Emission fetch error", err);
      }
    };

    // fetchUser();
    fetchEmissions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Welcome, {user.name || "User"}</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Your Carbon Emission History
        </h3>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="emissions"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">
            No emission data available yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
