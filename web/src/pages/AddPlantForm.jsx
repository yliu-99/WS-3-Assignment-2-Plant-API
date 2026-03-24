// AddPlantForm is the component for the /plants/add route. It displays a form with fields for all the plant properties, including a file input for the image. When the form is submitted, it sends a POST request to the backend to create a new plant, then navigates back to the archive page.

// import necessary hooks and components
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// URL for the backend API
const API = 'http://localhost:3001';

export default function AddPlantForm() {
  // navigate function and useState hooks for form fields and plant types
  const navigate = useNavigate();
  const [plantTypes, setPlantTypes] = useState([]);

  // Controlled state for each form field
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [size, setSize] = useState('medium');
  const [dateBought, setDateBought] = useState('');
  const [typeId, setTypeId] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  // Load plant types from the backend when the component mounts, and set the first type as the default selection.
  useEffect(() => {
    fetch(`${API}/plant-types`)
      .then((res) => res.json())
      .then((data) => {
        setPlantTypes(data);
        if (data.length > 0) setTypeId(data[0].id);
      });
  }, []);

  // handleSubmit is called once the form submits. All new data is collected into FormData, then sent as a POST request to the backend.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // FormData is used instead of JSON because the request includes a file upload.
    const formData = new FormData();
    formData.append('name', name);
    formData.append('species', species);
    formData.append('size', size);
    formData.append('date_bought', dateBought);
    formData.append('type_id', typeId);
    formData.append('image', image);

    // send POST request and if successful, navigate back to the archive page. If it fails, show an error message.
    const res = await fetch(`${API}/plants`, { method: 'POST', body: formData });
    if (!res.ok) { setError('Something went wrong. Try again.'); return; }
    // Go back to the archive once the plant is saved
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-lg mx-auto p-8">
        <Link to="/" className="text-sm text-stone-500 hover:text-green-700 transition-colors flex items-center gap-1 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to shelf
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
          <h1 className="text-xl font-bold text-stone-800 mb-6">Add a Plant</h1>

          {/* Show an error message if the POST request fails */}
          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-4">
            <FormField label="Name">
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
            </FormField>

            <FormField label="Species">
              <input type="text" required value={species} onChange={(e) => setSpecies(e.target.value)} className={inputCls} />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Size">
                <select value={size} onChange={(e) => setSize(e.target.value)} className={inputCls}>
                  <option value="x-small">X-Small</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="x-large">X-Large</option>
                </select>
              </FormField>

              {/* Type options come from the plant_types table */}
              <FormField label="Type">
                <select value={typeId} onChange={(e) => setTypeId(e.target.value)} className={inputCls}>
                  {plantTypes.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </FormField>
            </div>

            <FormField label="Date Bought">
              <input type="date" value={dateBought} onChange={(e) => setDateBought(e.target.value)} className={inputCls} />
            </FormField>

            <FormField label="Image">
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setImage(e.target.files[0])}
                className="text-sm text-stone-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
              />
            </FormField>

            <button type="submit" className="mt-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
              Add Plant
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Shared Tailwind classes for all text/select inputs
const inputCls = "w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 focus:outline-none focus:ring-2 focus:ring-green-300";

// Reusable wrapper that pairs a label with any input element
function FormField({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );
}
