import React from "react";
import { Item } from "../../interfaces/DTO.types";

interface Props {
  items: Item[];
}

const RowContent: React.FC<Props> = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <div key={index} style={{ display: "flex" }}>
          <div style={{ flex: "30%" }}>{item.name}</div>
          <div style={{ flex: "10%" }}>{item.pil ? "true" : "false"}</div>
          <div style={{ flex: "40%" }}>{item.masked ? "true" : "false"}</div>
          <div style={{ flex: "40%" }}>{item.type}</div>
        </div>
      ))}
    </>
  );
};

export default RowContent;
