import { useMemo } from "react";
import styled from "styled-components";

// STYLED COMPONENTS
const StyledMarker = styled.span`
  background-color: yellow;
  font-weight: bolder;
  border-radius: 2px;
`;

const StyledItem = styled.a`
  color: black;
  display: block;
  padding: 10px;
  border: none;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #4c91ba;
    color: white;
  }
  &:hover span {
    color: black;
  }
`;

export default function MarkedItem({ item, query, onClick }) {
  const { left, center, right } = useMemo(
    () => getPositions(item.title, query),
    [item, query]
  );

  function getPositions(title, query) {
    const lowerCaseTitle = title.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    const index = lowerCaseTitle.indexOf(lowerCaseQuery);

    // Return full title if query is not found
    if (index === -1) {
      return {
        left: title,
        center: "",
        right: "",
      };
    }

    const left = title.slice(0, index);
    const center = title.slice(index, index + query.length);
    const right = title.slice(index + query.length);

    return {
      left,
      center,
      right,
    };
  }

  function handleClick() {
    onClick(item);
  }

  return (
    <StyledItem onClick={handleClick}>
      {left}
      <StyledMarker>{center}</StyledMarker>
      {right}
    </StyledItem>
  );
}
