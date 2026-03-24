// Archive component shows the main plant grid and the sidebar with filter buttons and the add plant link. It fetches the plant list and plant types from the backend, and allows filtering the plants by type. It also passes a function to PlantCard to refresh the plant list after a delete.

// import necessary hooks and components
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlantCard from '../components/PlantCard';

// URL for the backend API
const API = 'http://localhost:3001';

export default function Archive() {
  // set up state for the plant list, plant types, and active filter selection
  const [plants, setPlants] = useState([]);
  const [plantTypes, setPlantTypes] = useState([]);
  // 'all' means no filter is active
  const [activeType, setActiveType] = useState('all');

  // Fetches the full plant list from the API and stores it in state
  const getAllPlants = () => {
    fetch(`${API}/plants`)
      .then((res) => res.json())
      .then((data) => setPlants(data));
  };

  // Load the plant list and plant types from the backend when the component mounts. The plant types are needed to render the filter buttons.
  useEffect(() => {
    getAllPlants();
    fetch(`${API}/plant-types`)
      .then((res) => res.json())
      .then((data) => setPlantTypes(data));
  }, []);

  // Filter the plant list based on the active type selection. If 'all' is selected, show every plant.
  const filtered = activeType === 'all'
    ? plants
    : plants.filter((p) => p.type === activeType);

  return (
    <div className="flex min-h-screen bg-stone-50">

      {/* Left Sidebar */}
      <aside className="w-56 shrink-0 bg-white border-r border-stone-200 flex flex-col p-5 gap-6 sticky top-0 h-screen">
        <div>
          <h1 className="text-lg font-bold text-green-800 tracking-tight">Yuhan's Plant Shelf</h1>
          <p className="text-xs text-stone-400 mt-0.5">a little green archive</p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1">Filter</p>
          <button
            onClick={() => setActiveType('all')}
            className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
              activeType === 'all'
                ? 'bg-green-100 text-green-800 font-medium'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            All plants
          </button>
          {plantTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.name)}
              className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${
                activeType === type.name
                  ? 'bg-green-100 text-green-800 font-medium'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* Add Plant link */}
        <div className="mt-auto">
          <Link
            to="/plants/add"
            className="block text-center text-sm bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl transition-colors"
          >
            + Add Plant
          </Link>
        </div>
      </aside>

      {/* Plant Grid*/}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-stone-700">
            {activeType === 'all' ? 'All Plants' : activeType}
            {/* Show count */}
            <span className="ml-2 text-sm font-normal text-stone-400">({filtered.length})</span>
          </h2>
        </div>

        {/* Empty state message when no plants match the filter */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-stone-400">
            <p className="text-4xl mb-3">🌿</p>
            <p className="text-sm">No plants here yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((plant) => (
              // Pass getAllPlants as onDeleted so the grid refreshes after a delete
              <PlantCard key={plant.id} plant={plant} onDeleted={getAllPlants} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
