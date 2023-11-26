export interface IBookWriterSearchParams {
    id?: number
    userId?: string
    bookId?: string
    status?: string 
    sort?: string
    size?: number
    page?: number
}

export interface IWriterPromoteSearchParams {
    id?: number
    userId?: string
    roleId?: string
    status?: string 
    sort?: string
    size?: number
    page?: number
}

export interface IBookWriterResponse {
    id: number
    userId: string
    fullName: string
    bookId: string
    status: string
    cover: string
    title: string
    description: string
    createDate: string
    modifyDate: string
}
export interface IWriterPromoteResponse {
    id: number
    userId: string
    fullName: string
    roleId: string
    status: string
    roleName: string
}


export interface IBookWriterSearchResponse {
    content: IBookWriterResponse[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
  }

export interface IWriterPromoteSearchResponse {
    content: IWriterPromoteResponse[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
  }

export interface IUpdateBookWriterRequest {
    id: number
    userId?: string
    bookId?: string
    status: string
}
export interface IUpdateWriterPromoteRequest {
    id: number
    userId?: string
    roleId?: string
    status: string
}