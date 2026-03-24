// PlantDetail shows all information for a single plant.

// import necessary hooks and components
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// URL for the backend API
const API = 'http://localhost:3001';

export default function PlantDetail() {
  // Get the plant ID from the URL parameters and create a navigate function
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);

  // Fetch the plant data whenever the ID in the URL changes
  useEffect(() => {
    fetch(`${API}/plants/${id}`)
      .then((res) => res.json())
      .then((data) => setPlant(data));
  }, [id]);

  // Send a DELETE request then go back to the archive
  const handleDelete = async () => {
    if (!confirm(`Delete "${plant.name}"?`)) return;
    await fetch(`${API}/plants/${id}`, { method: 'DELETE' });
    navigate('/');
  };

  // Show a loading state while waiting for the fetch to complete
  if (!plant) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center text-stone-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-3xl mx-auto p-8">
        {/* Back link */}
        <Link to="/" className="text-sm text-stone-500 hover:text-green-700 transition-colors flex items-center gap-1 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to shelf
        </Link>

        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200">
          {/* Hero image */}
          <div className="aspect-video overflow-hidden bg-stone-100">
            <img
              src={`${API}/uploads/${plant.image}`}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-stone-800">{plant.name}</h1>
                <p className="text-stone-500 italic">{plant.species}</p>
              </div>
              {/* Action buttons */}
              <div className="flex gap-2">
                <Link
                  to={`/plants/${plant.id}/edit`}
                  className="text-sm bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="text-sm bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Info cards for type, size, and date bought */}
            <div className="mt-5 grid grid-cols-3 gap-4">
              <div className="bg-stone-50 rounded-xl p-4">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Type</p>
                <p className="text-sm font-medium text-stone-700">{plant.type}</p>
              </div>
              <div className="bg-stone-50 rounded-xl p-4">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Size</p>
                <p className="text-sm font-medium text-stone-700 capitalize">{plant.size}</p>
              </div>
              <div className="bg-stone-50 rounded-xl p-4">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Date Bought</p>
                <p className="text-sm font-medium text-stone-700">
                  {/* Format the date or show a dash if none was set */}
                  {plant.date_bought ? new Date(plant.date_bought).toLocaleDateString() : '—'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
