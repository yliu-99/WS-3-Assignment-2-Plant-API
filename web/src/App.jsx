// import routing components from react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import page components for different routes
import Archive from './pages/Archive';
import PlantDetail from './pages/PlantDetail';
import AddPlantForm from './pages/AddPlantForm';
import EditPlantForm from './pages/EditPlantForm';

export default function App() {
  return (
    // handle routing on the client side without reloading the page
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Archive />} />
        <Route path="/plants/add" element={<AddPlantForm />} />
        <Route path="/plants/:id" element={<PlantDetail />} />
        <Route path="/plants/:id/edit" element={<EditPlantForm />} />
      </Routes>
    </BrowserRouter>
  );
}
