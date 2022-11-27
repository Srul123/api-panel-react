import React from "react";
import SearchBar from "../components/search-bar/SearchBar";
import Table from "../components/table/Table";
import { AppContext } from "../global-state/context";
import { ApiUrlData } from "../interfaces/DTO.types";

const Response: React.FC = () => {
  const response: ApiUrlData = React.useContext(AppContext).state.responseDataByFilters;

  return (
    <div>
      <SearchBar
        requestFiltered={response}
      />
      <Table tableData={response} />
    </div>
  );
};

export default Response;
