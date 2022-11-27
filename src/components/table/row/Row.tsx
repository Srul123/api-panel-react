import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Item } from "../../../interfaces/DTO.types";
import RowContent from "./row-content/RowContent";
import "./Row.scss";
interface Props {
  title: string;
  items: Item[];
  onPiiClick: (isActive: boolean) => void;
}
const Row: React.FC<Props> = ({ title, items, onPiiClick }) => {
  const [showRowContent, setShowRowContent] = React.useState(false);

  return (
    <div id="Row">
      <button onClick={() => setShowRowContent(!showRowContent)}>
        {showRowContent ? (
          <FontAwesomeIcon style={{ fontSize: "0.7em" }} icon={faChevronDown} />
        ) : (
          <FontAwesomeIcon
            style={{ fontSize: "0.7em" }}
            icon={faChevronRight}
          />
        )}{" "}
        {title}
      </button>
      {showRowContent && (
        <RowContent
          items={items}
          col1Space={"30%"}
          col2Space={"10%"}
          col3Space={"35%"}
          col4Space={"25%"}
          onPiiClick={onPiiClick}
        />
      )}
    </div>
  );
};

export default Row;
