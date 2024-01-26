export type TableColumn<T> = {
  title: string;
  key: keyof T;
  class?: string;
};
