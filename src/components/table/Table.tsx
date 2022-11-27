import React from "react";
import { ApiUrlData } from "../../interfaces/DTO.types";
import Row from "./row/Row";
import TableHeader from "./table-header/TableHeader";
import "./Table.scss";

interface Props {
  tableData: ApiUrlData;
  onPiiClick: (isActive: boolean) => void;
}

const Table: React.FC<Props> = ({ tableData, onPiiClick }) => {
  const { urlParams, queryParams, headers, body } = tableData;
  return (
    <div id="table" style={{ background: "white" }}>
      <TableHeader
        col1Title="NAME"
        col1Space={"30%"}
        col2Title="Pll"
        col2Space={"10%"}
        col3Title="MASKING"
        col3Space={"35%"}
        col4Title="TYPE"
        col4Space={"25%"}
      />
      <div className="rows">
        {urlParams && urlParams.length > 0 && (
          <Row title="URL Params" items={urlParams} onPiiClick={onPiiClick} />
        )}
        {queryParams && queryParams.length > 0 && (
          <Row title="Query Params" items={queryParams} onPiiClick={onPiiClick} />
        )}
        {headers && headers.length > 0 && (
          <Row title="Headers" items={headers} onPiiClick={onPiiClick} />
        )}
        {body && body.length > 0 && <Row title="Body" items={body} onPiiClick={onPiiClick} />}
      </div>
    </div>
  );
};

export default Table;
