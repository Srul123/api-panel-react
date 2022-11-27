import React, { createContext, useReducer, Dispatch } from "react";
import { ApiUrlData, Data } from "../interfaces/DTO.types";
import { AppActions, appReducer } from "./reducer";

export interface State {
  data: Data;
  requestDataByFilters: ApiUrlData;
  responseDataByFilters: ApiUrlData;
}

const intialState: State = {
  data: {
    api: "",
    method: "",
    path: "",
    request: {
      body: [],
      headers: [],
      queryParams: [],
      urlParams: [],
    },
    response: {
      body: [],
      headers: [],
      queryParams: [],
      urlParams: [],
    },
  },
  requestDataByFilters: {
    body: [],
    headers: [],
    queryParams: [],
    urlParams: [],
  },
  responseDataByFilters: {
    body: [],
    headers: [],
    queryParams: [],
    urlParams: [],
  },
};

const AppContext = createContext<{
  state: State;
  dispatch: Dispatch<AppActions>;
}>({
  state: intialState,
  dispatch: () => null,
});

interface Props {
  children: any;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, intialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
