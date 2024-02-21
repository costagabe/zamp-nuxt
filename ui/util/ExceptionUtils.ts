import { FetchError } from "ofetch";
import type { ApiError } from "../types/ApiResponse";

export function getValidationsFromApiError(e: FetchError<ApiError>) {
  const validations = e.data?.validations ?? {};
  return Object.keys(validations).flatMap((key) =>
    validations[key].map((message) => ({ path: key, message }))
  );
}
