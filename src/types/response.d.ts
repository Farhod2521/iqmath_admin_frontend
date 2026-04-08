export type ApiResponse<T> = {
  data: T[];
  count: number;
};

export type ApiResponseData<T> = {
  data: T[];
  message: number;
};


export type ApiParams = {
  page: number;
  limit: number;
  search?: string;
};
