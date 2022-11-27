import React from "react";
import { AppContext } from "../../global-state/context";
import { AppTypes } from "../../global-state/reducer";
import { ApiUrlData } from "../../interfaces/DTO.types";
import "./SearchBar.scss";

interface Props {
  requestFiltered: ApiUrlData;
}

const SearchBar: React.FC<Props> = ({ requestFiltered }) => {
  const [textInput, setTextInput] = React.useState("");
  const [isPllSelected, setIsPllSelected] = React.useState(false);
  const { dispatch } = React.useContext(AppContext);

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("onSubmit");
    console.log(textInput);
    console.log(requestFiltered);
    dispatch({
      type: AppTypes.RequestFilterByNameOrType,
      payload: textInput,
    });
  };

  return (
    <form id="form-search" onSubmit={(event) => onSubmit(event)}>
      <div id="search-panel">
        <div id="input-wrapper">
          <input type={"text"} placeholder="Search" onChange={(event)=> setTextInput(event.target.value)} />
        </div>
        <div id="checkbox-wrapper">
          <input type={"checkbox"} name="checkbox" onClick={()=> setIsPllSelected(!isPllSelected)} />
          <label htmlFor="checkbox"> Show Pll only</label>
        </div>
        <div id="submit-wrapper">
          <button type="submit"> Apply</button>
        </div>
      </div>
      <div>
        <button> Reset Filter</button>
      </div>
    </form>
  );
};

export default SearchBar;
