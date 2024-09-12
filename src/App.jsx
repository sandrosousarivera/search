import { useState } from "react";
import { animals } from "../constants/animals.jsx";
import { countries } from "../constants/countries.jsx";
import { cars } from "../constants/cars.jsx";
import SearchBar from "./components/searchBar/searchBar";
import styled from "styled-components";
// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  font-family: "Asap", sans-serif;
`;

const Header = styled.header`
  width: 80%;
  background-color: #f5f5f5;
  padding: 10px 20px;
  box-shadow: 4px 4px 0px rgba(40, 116, 166, 0.63);
  text-align: center;
  font-family: "Asap", sans-serif;
  color: rgba(40, 116, 166, 1);
`;

const ButtonContainer = styled.div`
  margin: 20px 0;
  font-family: "Asap", sans-serif;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: white;
  border: solid 1px #ccc;
  cursor: pointer;
  margin: 0 5px;
  font-family: "Asap", sans-serif;

  &:hover {
    background-color: #efefef;
  }

  &.active {
    background-color: #ddd;
  }
`;

const Content = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;
  font-family: "Asap", sans-serif;
`;

const SelectionDisplay = styled.div`
  margin: 20px 0;
  font-size: 16px;
  color: #333;
  font-family: "Asap", sans-serif;
`;

function App() {
  const [data, setData] = useState([...animals, ...cars, ...countries]);
  const [selection, setSelection] = useState(null);
  const [currentOption, setCurrentOption] = useState("all");

  function handleClick(e) {
    const op = e.target.name;

    switch (op) {
      case "all":
        setData([...animals, ...cars, ...countries]);
        setCurrentOption("all");
        break;

      case "cars":
        setData([...cars]);
        setCurrentOption("cars");
        break;

      case "animals":
        setData([...animals]);
        setCurrentOption("animals");
        break;

      case "countries":
        setData([...countries]);
        setCurrentOption("countries");
        break;

      default:
        break;
    }
  }

  function handleItemSelected(item) {
    setSelection(item);
  }

  return (
    <Container>
      <Header>
        <h1>Search for animals, car brands or countries!</h1>
      </Header>
      <ButtonContainer>
        <Button
          onClick={handleClick}
          name="all"
          className={currentOption === "all" ? "active" : ""}
        >
          All
        </Button>
        <Button
          onClick={handleClick}
          name="animals"
          className={currentOption === "animals" ? "active" : ""}
        >
          Animals
        </Button>
        <Button
          onClick={handleClick}
          name="cars"
          className={currentOption === "cars" ? "active" : ""}
        >
          Cars
        </Button>
        <Button
          onClick={handleClick}
          name="countries"
          className={currentOption === "countries" ? "active" : ""}
        >
          Countries
        </Button>
      </ButtonContainer>
      <SelectionDisplay>
        {selection ? `You selected: ${selection.title}` : ""}
      </SelectionDisplay>
      <SearchBar items={data} onItemSelected={handleItemSelected} />
    </Container>
  );
}

export default App;
