export interface IUserSearchParams {
  id?: number
  name?: string
  sort?: string
  size?: number
  page?:number
}

export interface IUserResponse {
  userId: number
  email: string
  username: string
  name: string
  isActive: boolean
  avatar: string
  roles: string[]
  createDate: string
  modifyDate: string
  coin: number
}

export interface IUserSearchResponse {
  content: IUserResponse[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}

export interface ISignUpRequest {
  email: string
  username: string
  name: string
  password: string
}

export interface IUpdateUserRequest {
  userId: number
  name: string
  isActive?: boolean
  avatar?: string
  roles: string[]
}
