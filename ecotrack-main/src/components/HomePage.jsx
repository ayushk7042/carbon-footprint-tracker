import { Leaf, Globe2, TreePine, Recycle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HomePage = () => {
  const missionPoints = [
    {
      icon: <Globe2 className="h-6 w-6 text-green-500" />,
      title: "Global Impact",
      description:
        "We're committed to reducing global carbon emissions through individual action and awareness.",
    },
    {
      icon: <TreePine className="h-6 w-6 text-green-500" />,
      title: "Environmental Stewardship",
      description:
        "Promoting sustainable practices and environmental consciousness in daily life.",
    },
    {
      icon: <Recycle className="h-6 w-6 text-green-500" />,
      title: "Sustainable Future",
      description:
        "Building a better tomorrow through data-driven environmental decisions today.",
    },
  ];

  const TypingText = ({ text, speed = 150, pause = 2000 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      const handleTyping = () => {
        if (!isDeleting && index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          setIndex((prev) => prev + 1);
        } else if (isDeleting && index > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        } else {
          setTimeout(() => setIsDeleting(!isDeleting), pause);
        }
      };

      const timeout = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
      return () => clearTimeout(timeout);
    }, [text, index, isDeleting, speed, pause]);

    return (
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center md:text-left text-gray-900 leading-tight">
        {displayedText}
      </h1>
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-20 items-center bg-gradient-to-b from-green-100 to-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-10 w-full max-w-7xl">
        <div className="flex-1 ml-12 mt-5 ">
          <TypingText
            text="Track Your Impact on the Planet 🌍"
            speed={200}
            pause={2000}
          />
          <p className="mt-4 mb-6 text-lg sm:text-xl text-gray-600 max-w-xl text-center md:text-left">
            Monitor, reduce, and take action against your carbon footprint.
          </p>
          <a
            href="#about"
            className="px-6 py-3 bg-white text-green-500 font-semibold rounded-full border-2 border-green-500 hover:bg-green-50 transition-colors duration-200 block w-max mx-auto md:ml-0"
          >
            Learn More
          </a>
        </div>
        <div className="flex-1 mt-8 md:mt-0">
          <img
            src="https://png.pngtree.com/png-clipart/20230914/original/pngtree-jungle-tree-clipart-cartoon-tree-in-the-jungle-vector-png-image_11091177.png"
            alt="Earth from space"
            className="w-full mt-34 max-w-md mx-auto"
          />
        </div>
      </div>

      <section
        id="about"
        className="py-16 bg-white rounded-3xl mt-36 w-full max-w-7xl shadow-lg mb-16 px-4"
      >
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Leaf className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            About EcoTrack
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            EcoTrack is your partner in the journey towards a sustainable
            future. We believe that small actions, when multiplied by millions,
            can transform the world.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {missionPoints.map((point, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-green-50 transform hover:-translate-y-1 transition-transform duration-200"
            >
              <div className="flex justify-center mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {point.title}
              </h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-6 sm:p-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
            <p className="text-gray-600 mb-4">
              Founded in 2025, EcoTrack emerged from a simple yet powerful idea:
              making environmental impact measurable and actionable for
              everyone. Our platform combines cutting-edge technology with
              environmental science to help individuals and communities
              understand and reduce their carbon footprint.
            </p>
            <p className="text-gray-600">
              Today, we&apos;re proud to serve millions of users worldwide,
              contributing to significant reductions in global carbon emissions
              through informed individual actions and collective effort.
            </p>
          </div>
        </div>
      </section>

      <Link
        to="/calculator"
        className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600"
      >
        Go to Emission Calculator
      </Link>
    </div>
  );
};

export default HomePage;
