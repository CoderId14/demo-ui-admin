export interface ITag {
  tagId: number;
  tagName: string;
  description: string;
  modifiedDate: string;
}

export interface TagSearchParams {
  id?: number;
  name?: string;
  books?: number[];
}
export interface TagSearchResponse {
  content: ITag[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}