import React from "react";
import Header from "./components/layouts/header/Header";
import Tabs from "./components/tabs/Tabs";
import Request from "./tab-views/Request";
import Response from "./tab-views/Response";
import { AppContext } from "./global-state/context";
import { AppTypes } from "./global-state/reducer";
import LoaderSpinner from "./components/layouts/loader-spinner/LoaderSpinner";
const mockData = require("./assets/fe_data.json");

const tabs = [
  { id: "1", tabTitle: "Request", tabContent: Request },
  { id: "2", tabTitle: "Response", tabContent: Response },
];

const App: React.FC = () => {
  const { dispatch } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    dispatch({
      type: AppTypes.SetData,
      payload: mockData,
    });
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <Header />
          <Tabs tabList={tabs} />
        </>
      )}
    </div>
  );
};

export default App;
