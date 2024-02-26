import { FetchError } from "ofetch";
import type { ApiError } from "../types/server-apiResponse";

export function getValidationsFromApiError(e: FetchError<ApiError>) {
  const validations = e.data?.validations ?? {};
  return Object.keys(validations).flatMap((key) =>
    validations[key].map((message) => ({ path: key, message }))
  );
}
