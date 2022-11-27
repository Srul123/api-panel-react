import React from "react";

const TableHeader: React.FC = () => {
  return (
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
  );
};

export default TableHeader;
