import React from 'react';

const plants = [
  { name: "Peepal Tree", benefit: "One of the best CO₂ absorbers." },
  { name: "Neem Tree", benefit: "Purifies air and provides medicinal benefits." },
  { name: "Bamboo", benefit: "Fast-growing, absorbs high levels of CO₂." },
  { name: "Areca Palm", benefit: "Releases oxygen, great indoor plant." },
  { name: "Snake Plant", benefit: "Converts CO₂ to oxygen at night." },
  { name: "Aloe Vera", benefit: "Air purifier and easy to grow." },
  { name: "Money Plant", benefit: "Absorbs pollutants like formaldehyde and CO₂." },
  { name: "Spider Plant", benefit: "Filters carbon monoxide, CO₂, and toxins." },
  { name: "Tulsi (Holy Basil)", benefit: "Emits oxygen and absorbs harmful gases." },
  { name: "Ficus Tree", benefit: "Reduces indoor air pollution significantly." }
];

const PlantsList = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-green-700 mb-4">🌿 Top 10 Plants That Absorb CO₂</h2>
    <ul className="space-y-2">
      {plants.map((plant, idx) => (
        <li key={idx} className="bg-green-50 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{plant.name}</h3>
          <p className="text-gray-700">{plant.benefit}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default PlantsList;
