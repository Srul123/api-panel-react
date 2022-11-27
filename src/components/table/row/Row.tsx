import React from "react";
import { Item } from "../../../interfaces/DTO.types";
import RowContent from "./row-content/RowContent";

interface Props {
  title: string;
  items: Item[];
}
const Row: React.FC<Props> = ({ title, items }) => {
  const [showRowContent, setShowRowContent] = React.useState(false);

  return (
    <div>
      <button onClick={() => setShowRowContent(!showRowContent)}>
        {title}
      </button>
      {showRowContent && <RowContent items={items} />}
    </div>
  );
};

export default Row;
