export type Pagination = {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  sorted: boolean;
  isFirst: boolean;
  isLast: boolean;
};

export type Page<T> = {
  content: T[];
  pagination?: Pagination;
};
