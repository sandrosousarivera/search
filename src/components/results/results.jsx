import { useState, useMemo, useEffect } from "react";
import MarkedItem from "../markedItem/markedItem";
import styled from "styled-components";

// STYLED COMPONENTS
const ResultsContainer = styled.div`
  position: absolute;
  width: 400px;
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

  // Use memoization to avoid recalculating filtered items unnecessarily
  const filteredItems = useMemo(() => findMatch(items, query), [items, query]);

  useEffect(() => {
    onResultsCalculated(results);
  }, [results]);

  function findMatch(items, query) {
    const lowerCaseQuery = query.toLowerCase();
    const res = items.filter(
      (i) => i.title.toLowerCase().includes(lowerCaseQuery) && query.length > 0
    );

    setResults(res);
    return res;
  }

  return (
    <ResultsContainer>
      {query.length > 0 && filteredItems.length === 0 ? (
        <div>No results found</div>
      ) : (
        filteredItems.map((item) => (
          <MarkedItem
            key={item.id}
            item={item}
            query={query}
            onClick={onItemSelected}
          />
        ))
      )}
    </ResultsContainer>
  );
}
