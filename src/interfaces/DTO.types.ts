/* Data Transfer Objects*/
export interface DataDto {
    api: httpMethod;
    method: string;
    path: string;
    request: ApiUrlData;
    response: ApiUrlData;
}


export type ApiUrlData = {
    headers: Item[];
    body: Item[]
    urlParams: Item[];
    queryParams: Item[];
}


export interface Item {
  name: string;
  pii: boolean;
  masked: boolean;
  type: string;
}

export type httpMethod = 'get' | 'post' | 'put' | 'patch' | "delete" | "";

