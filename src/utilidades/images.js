import starwarsLogo from "../assets/img/starwars.png"; // logo starwars

// Función para obtener la URL de la imagen según categoría e id
export function getImageUrl(category, id) {
  const RAW_BASE =
    "https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img";

  // Mapeo de categorías a carpetas
  const mapFolder = {
    people: "characters",
    planets: "planets",
    vehicles: "vehicles",
  };

  // Obtiene la carpeta según categoría
  const folder = mapFolder[category] || category;

  return `${RAW_BASE}/${folder}/${id}.jpg`;
}

// Si falla la carga, usamos el logo de Star Wars
export const placeholder = starwarsLogo;