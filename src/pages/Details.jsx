import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDetail } from "../services/swapi.js";
import { getImageUrl, placeholder } from "../utilidades/images.js";
import { useFavs } from "../context/FavsContext.jsx";

/**
 * Este componente funciona tanto si le pasas `type` por props
 * (como en tus rutas /people/:id) como si tu ruta tuviera
 * /:category/:id y lo quieres leer de useParams().
 */
export default function Details({ type: typeProp }) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const { toggleFav } = useFavs();

  const type = typeProp; // en tus rutas actuales viene por prop

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchDetail(type, id);
        setData(result);
      } catch (e) {
        setErr(String(e.message || e));
      }
    })();
  }, [type, id]);

  if (err) return <div className="alert alert-danger">{err}</div>;
  if (!data) return <div>Cargando…</div>;

  const props = data.properties || {};
  const name = props.name || data.uid;

  // Utilidad para formatear claves y hacerlas mas legibles: birth_year -> birth year
  const formatKey = (k) =>
    k.replaceAll("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="row g-4">
      <div className="col-md-5">
        <img
          className="img-fluid rounded shadow-sm"
          src={getImageUrl(type, id)}
          onError={(e) => (e.currentTarget.src = placeholder)}
          alt={name}
        />
      </div>

      <div className="col-md-7">
        <h2 className="mb-1">{name}</h2>
        {data.description && (
          <p className="text-muted">{data.description}</p>
        )}

        <button
          className="btn btn-warning mb-3"
          onClick={() => toggleFav({ type, id, name })}
        >
          ⭐ Guardar en favoritos
        </button>

        {/* Grid simple etiqueta/valor; text-break para URLs largas */}
        <div className="row">
          {Object.entries(props).map(([k, v]) => (
            <div className="col-12 col-sm-6 mb-2" key={k}>
              <strong className="d-block text-uppercase small">
                {formatKey(k)}
              </strong>
              <span className="text-break">{String(v)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}