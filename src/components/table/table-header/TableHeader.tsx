import React from "react";
import "./TableHeader.scss";

interface Props {
  col1Title: string;
  col1Space: string;
  col2Title: string;
  col2Space: string;
  col3Title: string;
  col3Space: string;
  col4Title: string;
  col4Space: string;
}

const TableHeader: React.FC<Props> = ({
  col1Title,
  col1Space,
  col2Title,
  col2Space,
  col3Title,
  col3Space,
  col4Title,
  col4Space
}) => {
  return (
    <div id="table-header">
      <div className="column col-1" style={{flex: col1Space}}>
        <span>{col1Title}</span>
      </div>
      <div className="column col-2" style={{flex: col2Space}}>
        <span>{col2Title}</span>
      </div>
      <div className="column col-3" style={{flex: col3Space}}>
        <span>{col3Title}</span>
      </div>
      <div className="column col-4" style={{flex: col4Space}}>
        <span>{col4Title}</span>
      </div>
    </div>
  );
};

export default TableHeader;
