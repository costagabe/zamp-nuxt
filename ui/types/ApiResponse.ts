export type ApiError = {
  title: string;
  status: number;
  validations: Record<string, Array<string>>;
};
export type ApiDataResponse<T> = {
  data: T;
  error: null;
};
export type ApiErrorResponse = {
  data: null;
  error: ApiError;
};

export type ApiResponse<T, K = unknown> = ApiDataResponse<T> | ApiErrorResponse;
