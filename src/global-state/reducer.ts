import { ApiUrlData, DataDto, Item } from "../interfaces/DTO.types";
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
  RequestFilterByPll = "REQUEST_FILTER_BY_PII",
  ResponseFilterByPll = "RESPONSE_FILTER_BY_PII",
  RequestResetAllFilters = "REQUEST_RESET_ALL_FILTERS",
  ResponseResetAllFilters = "RESPONSE_RESET_ALL_FILTERS",
}

type AppPayload = {
  [AppTypes.SetData]: DataDto;
  [AppTypes.RequestFilterByNameOrType]: string;
  [AppTypes.ResponseFilterByNameOrType]: string;
  [AppTypes.RequestFilterByPll]: boolean;
  [AppTypes.ResponseFilterByPll]: boolean;
  [AppTypes.RequestResetAllFilters]: undefined;
  [AppTypes.ResponseResetAllFilters]: undefined;
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
      const requestQueryParamsFiltered = filterByNameOrType(
        requestDataByFilters,
        "queryParams",
        action.payload
      );
      const requestUrlParamsFiltered = filterByNameOrType(
        requestDataByFilters,
        "urlParams",
        action.payload
      );
      const requestBodyFiltered = filterByNameOrType(
        requestDataByFilters,
        "body",
        action.payload
      );
      const requestHeadersFiltered = filterByNameOrType(
        requestDataByFilters,
        "headers",
        action.payload
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
    case AppTypes.RequestFilterByPll:
      const requestPll = { ...state.requestDataByFilters };
      const requestHeadersFilteredPll = filterByPll(
        requestPll,
        "headers",
        action.payload
      );
      const requestBodyFilteredPll = filterByPll(
        requestPll,
        "body",
        action.payload
      );
      const requestUrlParamsFilteredPll = filterByPll(
        requestPll,
        "urlParams",
        action.payload
      );
      const requestQueryParamsFilteredPll = filterByPll(
        requestPll,
        "queryParams",
        action.payload
      );
      const requestDataByPllFiltersToUpdate: ApiUrlData = {
        headers: requestHeadersFilteredPll,
        body: requestBodyFilteredPll,
        urlParams: requestUrlParamsFilteredPll,
        queryParams: requestQueryParamsFilteredPll,
      };
      return {
        ...state,
        requestDataByFilters: requestDataByPllFiltersToUpdate,
      };
    case AppTypes.ResponseFilterByPll:
      const responsePll = { ...state.responseDataByFilters };
      const responseHeadersFilteredPll = filterByPll(
        responsePll,
        "headers",
        action.payload
      );
      const responseBodyFilteredPll = filterByPll(
        responsePll,
        "body",
        action.payload
      );
      const responseDataByPllFiltersToUpdate: ApiUrlData = {
        headers: responseHeadersFilteredPll,
        body: responseBodyFilteredPll,
        urlParams: [],
        queryParams: [],
      };
      return {
        ...state,
        responseDataByFilters: responseDataByPllFiltersToUpdate,
      };
    case AppTypes.RequestResetAllFilters:
      return {
        ...state,
        requestDataByFilters: state.data.request,
      };
    case AppTypes.ResponseResetAllFilters:
      return {
        ...state,
        responseDataByFilters: state.data.response,
      };
    default:
      return state;
  }
};
type category = "body" | "headers" | "urlParams" | "queryParams";

function filterByNameOrType(
  data: ApiUrlData,
  category: category,
  filterBy: string
) {
  const filteredArray = data[category].filter(
    (item) => item.name.includes(filterBy) || item.type.includes(filterBy)
  );
  return filteredArray;
}

function filterByPll(data: ApiUrlData, category: category, filterBy: boolean) {
  const filteredArray = data[category].filter((item) => item.pii === filterBy);
  return filteredArray;
}

