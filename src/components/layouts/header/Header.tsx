import React from "react";
import { AppContext } from "../../../global-state/context";
import "./Header.scss";

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
          {`All APIs > ${data.api} >`}
          <span>{`${data.path}`}</span>
        </h3>
      </div>
    </header>
  );
};

export default Header;
