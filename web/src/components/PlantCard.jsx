// PlantCard displays a single plant in the Archive list, with its image, name, species, type, and size. It also has a delete button that allows the user to remove the plant from the archive. 

// import the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom';

// URL for the backend API
const API = 'http://localhost:3001';

export default function PlantCard({ plant, onDeleted }) {
  // create a navigate function using the useNavigate hook
  const navigate = useNavigate();

  // a function to handle deleting the plant when the delete button is clicked
  const handleDelete = async (e) => {
    // Stop the click from also triggering the card's navigate onClick
    e.stopPropagation();
    if (!confirm(`Delete "${plant.name}"?`)) return;
    await fetch(`${API}/plants/${plant.id}`, { method: 'DELETE' });
    // Tell the parent (Archive) to re-fetch the plant list
    onDeleted();
  };

  return (
    <div
      onClick={() => navigate(`/plants/${plant.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 cursor-pointer hover:shadow-md transition-shadow group"
    >
      {/* Plant image */}
      <div className="aspect-square overflow-hidden bg-stone-100">
        <img
          src={`${API}/uploads/${plant.image}`}
          alt={plant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-stone-800 truncate">{plant.name}</h3>
            <p className="text-sm text-stone-500 italic truncate">{plant.species}</p>
          </div>
          {/* Delete button */}
          <button
            onClick={handleDelete}
            className="shrink-0 text-stone-300 hover:text-red-400 transition-colors p-1"
            title="Delete plant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Type and size badges */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full capitalize">
            {plant.type}
          </span>
          <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full capitalize">
            {plant.size}
          </span>
        </div>
      </div>
    </div>
  );
}
