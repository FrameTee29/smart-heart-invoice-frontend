export interface BaseProps {
  uuid: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IPaginationOptions {
  page?: number;
  limit?: number;
  key?: string;
  search?: string;
}

export interface IPaginationMeta {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface IPagination<T> {
  data: T[];
  meta: IPaginationMeta;
}
