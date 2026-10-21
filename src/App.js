import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contacto from "./components/Contacto";
import Inicio from "./pages/Inicio";
import AcercaDe from "./pages/AcercaDe";
import ProyectoBlob from "./pages/ProyectoBlob";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/proyecto-blob" element={<ProyectoBlob />} />
        <Route path="/acerca-de-nosotros" element={<AcercaDe />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
