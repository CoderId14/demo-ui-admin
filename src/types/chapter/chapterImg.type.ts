export interface IChapterImg{
    id: string;
    fileUrl: string;
    imgNumber?: number;
    chapterId?: number;
}


export interface ISaveBulkChapterImgRequest{
    chapterId: number;
    listImg: IChapterImg[];
}

export interface ChapterImgSearchParams {
    chapterId: number
    name?: string
    size?: number
    sort?: string
}
export interface ChapterImgSearchResponse {
    content: IChapterImg[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
  }
  
export interface SaveBulkChapterRequest{
    chapterId: number;
    listImg: IChapterImg[];
}

export interface ChapterImgList{
    chapterId: number;
    imgChapterList: ChapterImgSearchResponse;
}