import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../../../global-state/context";
import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header: React.FC = () => {
  const data = React.useContext(AppContext).state.data;
  return (
    <header id="Header">
      <div>
        <h1>
          <span id="http-method">{`${data.method}`}</span>
          <span>{`${data.path}`}</span>
        </h1>
      </div>
      <div>
        <h3>
          {`All APIs `} <FontAwesomeIcon style={{fontSize:"0.5em"}} icon={faChevronRight} />{" "}
          <span>{`${data.api}`}</span>
          {" "}<FontAwesomeIcon style={{fontSize:"0.5em"}} icon={faChevronRight} />
          {" "}<span id="path">{`${data.path}`}</span>
         
        </h3>
      </div>
    </header>
  );
};

export default Header;
