const API = "https://www.swapi.tech/api";

//Funcion para lista (people,planets,vehicles)
export async function list(type, page = 1, limit = 10) {
  const url = `${API}/${type}?page=${page}&limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error obteniendo lista");
  const data = await res.json();
  return data.results || [];
}

//funcion para obtener detalles de un elemento por tipo e ID
export async function fetchDetail(type, id) {
  const res = await fetch(`${API}/${type}/${id}`);
  if (!res.ok) throw new Error("Error obteniendo detalle");
  const data = await res.json();
  return data.result;
}