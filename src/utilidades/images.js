import starwarsLogo from "../assets/img/starwars.png";//logo starwars

// Función para obtener la URL de la imagen según la categoría y el ID
export function getImageUrl(category, id) {
  const RAW_BASE =
    "https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img";//Url base de las imágenes

    //Mapeo de categorías a carpetas
  const mapFolder = {
    people: "characters",
    planets: "planets",
    vehicles: "vehicles",
  };
  //obtiene la carpeta segun categoria
  const folder = mapFolder[category] || category;
  return `${RAW_BASE}/${folder}/${id}.jpg`;//Construimos la URL de la imagen(concatena la base, la carpeta y el id )
}

// si falla la carga, usamos el logo de Star Wars
export const placeholder = starwarsLogo;