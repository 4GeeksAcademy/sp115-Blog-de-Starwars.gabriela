import { useEffect, useState } from "react";
import { list } from "../services/swapi.js";
import Card from "../components/Card.jsx";

// Componente para mostrar una sección de elementos (personajes, vehículos, planetas)
function Section({ title, category }) {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await list(category, 1, 10); // límite 10 por categoría
        setItems(data);
      } catch (e) {
        setErr(String(e.message || e));
      }
    })();
  }, [category]);

  return (
    <section className="mb-5">
      <h3 className="mb-3">{title}</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <div className="row g-3">
        {items.map(({ uid, name }) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={uid}>
            <Card category={category} id={uid} name={name} />
          </div>
        ))}
      </div>
    </section>
  );
}

//componente principal de Home
export default function Home() {
  return (
    <>
      <Section title="Personajes" category="people" />
      <Section title="Vehículos" category="vehicles" />
      <Section title="Planetas" category="planets" />
    </>
  );
}