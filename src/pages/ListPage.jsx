import React, { useEffect, useState } from "react";
import { fetchList } from "../services/swapi.js";
import Card from "../components/Card.jsx";

const titles = {
  people: "Personas",
  planets: "Planetas",
  vehicles: "Vehículos",
};

//Componente principal de la pagina de listado
export default function ListPage({ type }) {
  const [items, setItems] = useState([]);//guardar los items obtenidos
  const [loading, setLoading] = useState(true);//indacar si está cargando
  const [err, setErr] = useState("");//guarda posibles errores

  useEffect(() => {
    setLoading(true);//activa el estado de carga
    fetchList(type, 10)
      .then(setItems)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));//desactiva el estado de carga
  }, [type]);

  if (loading) return <p>Cargando…</p>;
  if (err) return <p className="text-danger">{err}</p>;

  return (
    <>
      <h2 className="mb-3">{titles[type]} (máx. 10)</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
        {items.map((it) => <Card key={it.uid} type={type} item={it} />)}
      </div>
    </>
  );
}