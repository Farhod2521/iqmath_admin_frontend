export type ApiResponse<T> = {
  data: T[];
  count: number;
};

export type ApiParams = {
  page: number;
  limit: number;
  search?: string;
};
