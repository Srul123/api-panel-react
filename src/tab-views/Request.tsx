import React from "react";
import SearchBar from "../components/search-bar/SearchBar";
import Table from "../components/table/Table";
import { AppContext } from "../global-state/context";
import { ApiUrlData } from "../interfaces/DTO.types";

const Request: React.FC = () => {
  const request: ApiUrlData = React.useContext(AppContext).state.requestDataByFilters;

  return (
    <div>
      <SearchBar
        requestFiltered={request}
      />
      <Table tableData={request} />
    </div>
  );
};

export default Request;
