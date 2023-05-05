import { Category } from '../category/category.type'
import { LatestChapter } from '../chapter/chapter.type'
import { ITag } from '../tag/tag.type'

export interface Book {
  bookId: number
  title: string
  content: string
  shortDescription: string
  categories?: Category[]
  tags?: ITag[]
  thumbnail: string | null
  thumbnailUrl: string
  author: string
  latestChapters?: LatestChapter[]
  viewCount: number
  likeCount: number
  averageRating: number
  premium: boolean
}
export interface BookDetails {
  bookId: number
  title: string
  content: string
  shortDescription: string
  categories: Category[]
  tags: ITag[]
  thumbnail: string | null
  thumbnailUrl: string
  author: string
  latestChapters: LatestChapter[]
  viewCount: number
  likeCount: number
  averageRating: number
  premium: boolean
}
export interface BookResponse {
  content: Book[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}

export interface BookParamRequest {
  id?: number
  title?: string
  content?: string
  shortDescription?: string
  categories?: number[]
  tags?: number[]
  thumbnail?: string | null
  thumbnailUrl?: string
  user?: number
  page?: number
  size?: number
  detail?: boolean | string
  isPremium?: boolean
}
export interface BookUpdateInfo {
  id: string | number
  title: string
  content: string
  categories: number[]
  tags: number[]
  thumbnail?: string | null
  thumbnailUrl: string
  isPremium: boolean
}

export interface BookAddInfo {
  title: string
  content: string
  categories: number[]
  tags: number[]
  thumbnail?: string | null
  thumbnailUrl: string
  isPremium: boolean
}
