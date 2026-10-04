// Respuesta paginada de Spring Data (PagedModel)
export interface PageResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

// Query params que entiende tu backend: ?page=0&size=10&sort=name,asc&search=tec
export interface TableQueryParams {
  page: number;
  size: number;
  sort?: string;
  search?: string;
}
