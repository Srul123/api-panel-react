import React from "react";

import "./LoaderSpinner.scss";

const LoaderSpinner: React.FC = () => {
  return (
    <div id="loader-spinner">
      <div className="loader"></div>
      <div className="text-loader">Loading...</div>
    </div>
  );
};

export default LoaderSpinner;
