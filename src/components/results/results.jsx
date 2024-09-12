import { useState, useMemo } from "react";
import MarkedItem from "../markedItem/markedItem";
import styled from "styled-components";

//STYLED COMPONENTS//
const ResultsContainer = styled.div`
  position: absolute;
  width: 100%; // Ancho flexible para mejor adaptabilidad en móviles
  background: white;
  border: solid 1px #222;
  border-top: solid 1px transparent;
  margin-top: -3px;
  box-sizing: border-box;
  border-radius: 0 0 5px 5px;
`;

export default function Results({
  items,
  onItemSelected,
  query,
  onResultsCalculated,
}) {
  const [results, setResults] = useState([]);

  // Utilizamos useMemo para optimizar el filtrado
  const filteredItems = useMemo(() => findMatch(items, query), [items, query]);

  // Función para encontrar coincidencias
  function findMatch(items, query) {
    const res = items.filter((i) => {
      // Convertimos ambos a minúsculas para una búsqueda insensible a mayúsculas
      return (
        i.title.toLowerCase().indexOf(query.toLowerCase()) >= 0 &&
        query.length > 0
      );
    });

    // Actualizamos los resultados y notificamos los resultados calculados
    setResults(res);
    onResultsCalculated(res);
    return res;
  }

  return (
    <ResultsContainer>
      {/* Asegúrate de que no sea solo espacios vacíos */}
      {query.trim() !== ""
        ? filteredItems.map((item) => (
            <MarkedItem
              key={item.id}
              item={item}
              query={query}
              onClick={onItemSelected}
            />
          ))
        : ""}
    </ResultsContainer>
  );
}
