import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { FavsProvider } from "./context/FavsContext.jsx";
import Home from "./pages/Home.jsx";
import Details from "./pages/Details.jsx";

//Componente principal que define las rutas.
export default function routes() {
  return (
    <FavsProvider>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people/:id" element={<Details type="people" />} />
          <Route path="/planets/:id" element={<Details type="planets" />} />
          <Route path="/vehicles/:id" element={<Details type="vehicles" />} />
        </Routes>
      </div>
    </FavsProvider>
  );
}