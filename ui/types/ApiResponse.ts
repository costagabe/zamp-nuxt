export type ApiError<T = unknown> = {
    title: string;
    status: number;
    messages: Array<string>;
};
export type ApiDataResponse<T> = {
    data: T;
    error: null;
};
export type ApiErrorResponse<T> = {
    data: null;
    error: ApiError<T>;
};

export type ApiResponse<T, K = unknown> = ApiDataResponse<T> | ApiErrorResponse<K>;
