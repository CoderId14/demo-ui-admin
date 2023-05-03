export interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  modifiedDate: string;
}

export interface CategorySearchParams {
  id?: number;
  name?: string;
  books?: number[];
  page?:number;
  size?: number;
}
export interface CategorySearchResponse {
  content: Category[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}