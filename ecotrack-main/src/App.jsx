
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import EmissionCalculator from './components/EmissionCalculator';

import Login from './components/Login';
import Signup from './components/Signup';
import PlantsList from './components/PlantsList';
import GasSlides from './components/GasSlides';

import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
       <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/calculator" element={<EmissionCalculator />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />  
        <Route path="/plants" element={<PlantsList />} />
        <Route path="/greenhouse-gases" element={<GasSlides />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>


    </>
  );
}

export default App;