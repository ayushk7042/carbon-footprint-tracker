import React, { useState } from 'react';

const slides = [
  {
    title: "Carbon Dioxide (CO₂)",
    content: "Major contributor to global warming. Comes from fossil fuels, deforestation, etc."
  },
  {
    title: "Methane (CH₄)",
    content: "More potent than CO₂. Comes from agriculture, landfills, oil and gas systems."
  },
  {
    title: "Nitrous Oxide (N₂O)",
    content: "Emitted from fertilizers, biomass burning, and industrial processes."
  },
  {
    title: "Chlorofluorocarbons (CFCs)",
    content: "Synthetic gas. Damages ozone and traps heat in the atmosphere."
  },
  {
    title: "Ozone (O₃)",
    content: "Tropospheric ozone is a greenhouse gas and air pollutant."
  },
  {
    title: "Why is Global Warming Increasing?",
    content: `🔥 Burning of fossil fuels\n🌲 Deforestation\n🏭 Industrial emissions\n🚗 Transportation pollution\n🌡️ Lifestyle choices & lack of awareness`
  }
];

const GasSlides = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((index + 1) % slides.length);
  const prev = () => setIndex((index - 1 + slides.length) % slides.length);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold text-red-600 mb-4">🌍 Greenhouse Gases & Global Warming</h2>
      <div className="bg-gray-100 p-6 rounded shadow-md min-h-[180px]">
        <h3 className="text-xl font-semibold mb-2">{slides[index].title}</h3>
        <p className="text-gray-700 whitespace-pre-line">{slides[index].content}</p>
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button onClick={prev} className="bg-green-500 text-white px-4 py-1 rounded">⬅️ Prev</button>
        <button onClick={next} className="bg-green-500 text-white px-4 py-1 rounded">Next ➡️</button>
      </div>
    </div>
  );
};

export default GasSlides;
