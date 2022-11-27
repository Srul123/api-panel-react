import React from "react";
import { Item } from "../../../../interfaces/DTO.types";
import "./RowContent.scss";

interface Props {
  items: Item[];
  col1Space: string;
  col2Space: string;
  col3Space: string;
  col4Space: string;
  onPiiClick: (isActive: boolean) => void;
}

const RowContent: React.FC<Props> = ({
  items,
  col1Space,
  col2Space,
  col3Space,
  col4Space,
  onPiiClick,
}) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index} id={"RowContent"}>
          <div className="column col-1" style={{ flex: col1Space }}>
            <span>{item.name}</span>
          </div>
          <div className="column col-2" style={{ flex: col2Space }}>
            <span
              className={item.pii ? "active-true" : "active-false"}
              onClick={() => onPiiClick(item.pii)}
            >
              PII
            </span>
          </div>
          <div className="column col-3" style={{ flex: col3Space }}>
            <span
              className={item.pii ? "active-true" : "active-false"}
              onClick={() => onPiiClick(item.pii)}
            >
              MASKED
            </span>
          </div>
          <div className="column col-4" style={{ flex: col4Space }}>
            <span> {item.type}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default RowContent;
