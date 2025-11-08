import { createContext, useContext, useState } from "react";

// Contexto para manejar favoritos
const FavsContext = createContext();

export function FavsProvider({ children }) {
  const [favs, setFavs] = useState([]);

  //funcion para añadir o eliminar favoritos
  function toggleFav(item) {
    const key = `${item.category}-${item.id}`;
    if (favs.some((f) => f.key === key)) {
      // eliminar
      setFavs(favs.filter((f) => f.key !== key));
    } else {
      // añadir
      setFavs([...favs, { ...item, key }]);
    }
  }

  //devuelve true si el item ya es favorito
  function isFav(item) {
    const key = `${item.category}-${item.id}`;
    return favs.some((f) => f.key === key);
  }

  //Damos el estado y funciones a los componentes hijos
  return (
    <FavsContext.Provider value={{ favs, toggleFav, isFav }}>
      {children}
    </FavsContext.Provider>
  );
}

export function useFavs() {
  return useContext(FavsContext);
}