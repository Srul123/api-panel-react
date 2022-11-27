import React from "react";
import { ApiUrlData } from "../../interfaces/DTO.types";
import Row from "./row/Row";
import TableHeader from "./table-header/TableHeader";
import "./Table.scss";

interface Props {
  tableData: ApiUrlData;
}

const Table: React.FC<Props> = ({ tableData }) => {
  const { urlParams, queryParams, headers, body } = tableData;
  return (
    <div id="table" style={{ background: "white" }}>
      <TableHeader />
      <div className="rows">
        {urlParams && urlParams.length > 0 && (
          <Row title="URL Params" items={urlParams} />
        )}
        {queryParams && queryParams.length > 0 && (
          <Row title="Query Params" items={queryParams} />
        )}
        {headers && headers.length > 0 && (
          <Row title="Headers" items={headers} />
        )}
        {body && body.length > 0 && <Row title="Body" items={body} />}
      </div>
    </div>
  );
};

export default Table;
