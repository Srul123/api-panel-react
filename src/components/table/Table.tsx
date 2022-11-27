import React from "react";
import { ApiUrlData } from "../../interfaces/DTO.types";
import Row from "./Row";

interface Props {
  tableData: ApiUrlData;
}

const Table: React.FC<Props> = ({ tableData }) => {
  const { urlParams, queryParams, headers, body } = tableData;
  return (
    <div style={{ background: "white" }}>
      <div style={{ display: "flex", borderBottom: "1px solid gray" }}>
        <div style={{ flex: "30%" }}>
          <span>NAME</span>
        </div>
        <div style={{ flex: "10%" }}>
          <span>Pll</span>
        </div>
        <div style={{ flex: "40%" }}>
          <span>MASKING</span>
        </div>
        <div style={{ flex: "40%" }}>
          <span>TYPE</span>
        </div>
      </div>
      <div>
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
