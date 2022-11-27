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
    const input = textInput.toLocaleLowerCase();
    dispatch({
      type: AppTypes.RequestFilterByNameOrType,
      payload: input,
    });
    if (isPllSelected) {
      dispatch({
        type: AppTypes.RequestFilterByPll,
        payload: true,
      });
    } else {
      dispatch({
        type: AppTypes.RequestFilterByPll,
        payload: true,
      });
      dispatch({
        type: AppTypes.RequestFilterByNameOrType,
        payload: input,
      });
    }
  };

  const onPiiClick = (isActive: boolean) => {
    dispatch({
      type: AppTypes.RequestFilterByPll,
      payload: isActive,
    });
    console.log(isActive);
    
    setIsPllSelected(isActive);
  }

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
      <Table tableData={request} onPiiClick={onPiiClick} />
    </div>
  );
};

export default Request;
