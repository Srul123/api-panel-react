import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.scss";

interface Props {
  handleOnSubmit: (event: { preventDefault: () => void }) => void;
  handleResetFilters: () => void;
  textSearchInput: string;
  setTextSearchInput: React.Dispatch<React.SetStateAction<string>>;
  isPllSelected: boolean;
  setIsPllSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<Props> = ({
  handleOnSubmit,
  handleResetFilters,
  textSearchInput,
  setTextSearchInput,
  isPllSelected,
  setIsPllSelected,
}) => {
  return (
    <form id="form-search" onSubmit={handleOnSubmit}>
      <div id="search-panel">
        <div id="input-wrapper">
          <span className="icon-search-wrapper">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            type={"text"}
            placeholder="Search"
            value={textSearchInput}
            onChange={(event) => setTextSearchInput(event.target.value)}
          />
        </div>
        <div id="checkbox-wrapper">
          <input
            type={"checkbox"}
            name="checkbox"
            checked={isPllSelected}
            onChange={(event) => setIsPllSelected(!isPllSelected)}
          />
          <label htmlFor="checkbox"> Show Pll only</label>
        </div>
        <div id="submit-wrapper">
          <button type="submit"> Apply</button>
        </div>
      </div>
      <div>
        <div className="reset-button-wrapper">
          <button onClick={handleResetFilters}> Reset Filter</button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
