import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export interface IApiRequestServiceProps {
  url: string;
  method: string;
  params?: Record<string, string> | null;
}
export const ContentType = {
  json: "application/json",
};
export const baseOptions = {
  method: "GET", // always send cookies、HTTP Basic authentication.
  headers: new Headers({
    "Content-Type": ContentType.json,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  }),
};
export const apiFetchRequest = async <T>(args: IApiRequestServiceProps) => {
  const { method, params, url: dataUrl } = args;
  const options = {
    ...baseOptions,
    ...args,
    method: method,
  };
  let urlSearchParams = "";
  if (params) {
    urlSearchParams = "?" + new URLSearchParams(params);
  }
  let result;
  const url = `https://api.github.com${dataUrl}${urlSearchParams}`;
  let data: T | null = null;
  try {
    result = await fetch(url, options);
    data = await result.json();
  } catch (error) {
    console.log("🔴 Error", error);
  }

  if (!result?.ok) {
    console.log("🔴 Error", result?.ok, result?.status, data);
    return {
      data: null,
      error: "Something went wrong",
    };
  } else {
    return {
      data: data,
      error: null,
    };
  }
};
