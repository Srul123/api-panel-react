import React from "react";
import SearchBar from "../components/search-bar/SearchBar";
import Table from "../components/table/Table";
import { AppContext } from "../global-state/context";
import { AppTypes } from "../global-state/reducer";
import { ApiUrlData } from "../interfaces/DTO.types";

const Request: React.FC = () => {
  const { dispatch } = React.useContext(AppContext);
  const request: ApiUrlData =
    React.useContext(AppContext).state.requestDataByFilters;
  const [textInput, setTextInput] = React.useState("");
  const [isPllSelected, setIsPllSelected] = React.useState(false);

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (textInput !== "") {
      dispatch({
        type: AppTypes.RequestFilterByNameOrType,
        payload: textInput,
      });
    }
    if (isPllSelected) {
      dispatch({
        type: AppTypes.RequestFilterByPll,
        payload: true,
      });
    }
  };

  const onReset = () => {
    setTextInput("");
    setIsPllSelected(false);
    dispatch({
      type: AppTypes.RequestResetAllFilters,
      payload: undefined,
    });
  };

  const checkForEmptyResults = (request: ApiUrlData) => {
    const { headers, body, queryParams, urlParams } = request;
    if (
      headers.length === 0 &&
      body.length === 0 &&
      queryParams.length === 0 &&
      urlParams.length === 0
    ) {
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
      {checkForEmptyResults(request)}
      <Table tableData={request} />
    </div>
  );
};

export default Request;
