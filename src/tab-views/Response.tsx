import React from "react";
import SearchBar from "../components/search-bar/SearchBar";
import Table from "../components/table/Table";
import { AppContext } from "../global-state/context";
import { AppTypes } from "../global-state/reducer";
import { ApiUrlData } from "../interfaces/DTO.types";

const Response: React.FC = () => {
  const { dispatch } = React.useContext(AppContext);
  const response: ApiUrlData =
    React.useContext(AppContext).state.responseDataByFilters;
  const [textInput, setTextInput] = React.useState("");
  const [isPllSelected, setIsPllSelected] = React.useState(false);

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (textInput !== "") {
      dispatch({
        type: AppTypes.ResponseFilterByNameOrType,
        payload: textInput,
      });
    }
    if (isPllSelected) {
      dispatch({
        type: AppTypes.ResponseFilterByPll,
        payload: true,
      });
    }
  };

  const onReset = () => {
    setIsPllSelected(false);
    setTextInput("");
    dispatch({
      type: AppTypes.ResponseResetAllFilters,
      payload: undefined,
    });
  };

  const checkForEmptyResults = (request: ApiUrlData) => {
    const { headers, body } = request;
    if (headers.length === 0 && body.length === 0) {
      return <div>No results match your filters</div>;
    }
  };

  return (
    <div>
      <SearchBar
        handleOnSubmit={onSubmit}
        handleResetFilters={onReset}
        textSearchInput={textInput}
        setTextSearchInput={setTextInput}
        isPllSelected={isPllSelected}
        setIsPllSelected={setIsPllSelected}
      />
      {checkForEmptyResults(response)}
      <Table tableData={response} />
    </div>
  );
};

export default Response;
