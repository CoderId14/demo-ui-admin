export interface IRoleResponse {
    id: number
    roleName: string
    createdDate: string
    modifiedDate: string
}

export interface IRoleSearchResponse {
    content: IRoleResponse[]
    page: number
    size: number
    totalElements: number
    totalPages: number
    last: boolean
}

export interface IRoleSearchParams {
    id?: number
    roleName?: string
    sort?: string
    size?: number
    page?: number
}