import { ApiUrlData, Data, Item } from "../interfaces/DTO.types";
import { State } from "./context";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum AppTypes {
  SetData = "SET_DATA",
  RequestFilterByNameOrType = "REQUEST_FILTER_BY_NAME_OR_TYPE",
  ResponseFilterByNameOrType = "RESPONSE_FILTER_BY_NAME_OR_TYPE",
  RequestFilterByPll = "RESPONSE_FILTER_BY_PLL",
  ResponseFilterByPll = "RESPONSE_FILTER_BY_PLL",
}

type AppPayload = {
  [AppTypes.SetData]: Data;
  [AppTypes.RequestFilterByNameOrType]: string;
  [AppTypes.ResponseFilterByNameOrType]: string;
  [AppTypes.RequestFilterByPll]: boolean;
  [AppTypes.ResponseFilterByPll]: boolean;
};

export type AppActions = ActionMap<AppPayload>[keyof ActionMap<AppPayload>];

export const appReducer = (state: State, action: AppActions) => {
  switch (action.type) {
    case AppTypes.SetData:
      return {
        ...state,
        data: action.payload,
        requestDataByFilters: action.payload.request,
        responseDataByFilters: action.payload.response,
      };
    case AppTypes.RequestFilterByNameOrType:
      const requestDataByFilters = { ...state.data.request };
      const requestQueryParamsFiltered =
        requestDataByFilters.queryParams?.filter(
          (item) => item.name === action.payload || item.type === action.payload
        );
      const requestUrlParamsFiltered = requestDataByFilters.urlParams?.filter(
        (item) => item.name === action.payload || item.type === action.payload
      );
      const requestHeadersFiltered = requestDataByFilters.headers.filter(
        (item) => item.name === action.payload || item.type === action.payload
      );
      const requestBodyFiltered = requestDataByFilters.body.filter(
        (item) => item.name === action.payload || item.type === action.payload
      );
      const requestDataByFiltersToUpdate: ApiUrlData = {
        queryParams: requestQueryParamsFiltered,
        urlParams: requestUrlParamsFiltered,
        headers: requestHeadersFiltered,
        body: requestBodyFiltered,
      };
      return {
        ...state,
        requestDataByFilters: requestDataByFiltersToUpdate,
      };
    case AppTypes.ResponseFilterByNameOrType:
      const response = { ...state.data.response };
      const responseHeadersFiltered = filterByNameOrType(
        response,
        "headers",
        action.payload
      );
      const responseBodyFiltered = filterByNameOrType(
        response,
        "body",
        action.payload
      );
     
      const responseDataByFiltersToUpdate: ApiUrlData = {
        headers: responseHeadersFiltered,
        body: responseBodyFiltered,
        queryParams: [],
        urlParams: [],
      };
      return {
        ...state,
        responseDataByFilters: responseDataByFiltersToUpdate,
      };
    case AppTypes.ResponseFilterByNameOrType:
      return {
        ...state,
      };
    default:
      return state;
  }
};

function filterByNameOrType(
  data: ApiUrlData,
  category: "body" | "headers" | "urlParams" | "queryParams",
  filterBy: string
) {
  const filteredArray = data[category].filter(
    (item) => item.name === filterBy || item.type === filterBy
  );
  return filteredArray;
}
