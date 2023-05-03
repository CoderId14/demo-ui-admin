export interface User {
  username: string
  accessToken?: string
  refreshToken?: string
  roles: string[]
}
export interface UserLoginSliceState {
  user: User | undefined
  isFetching: boolean
  error: boolean
  message: string
}
export interface UserLogoutSliceState {
  isFetching: boolean
  error: boolean
  success: boolean
}
export interface DataLogin {
    email: string;
    exp: number;
    iat: number;
    roles: string[];
    sub: string;
    userId: number;
    accessToken: string;
    refreshToken: string;
  }
  export interface ResponseLogin {
    status: string;
    message: string;
    responseData: {
      accessToken: string;
      refreshToken: string;
      username: string;
      roles: string[]
    };
  }
  export interface JwtInfo {
    email: string;
    exp: number;
    iat: number;
    roles: string;
    sub: string;
    userId: number;
  }
  
  export interface RefreshTokenResponse{
    accessToken: string;
    refreshToken: string;
    tokenType: string;
  }