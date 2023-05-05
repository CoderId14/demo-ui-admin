import axiosInstance from '@/config/axios'
import { JwtInfo, ResponseLogin } from '@/types/auth.type'
import { AnyAction } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { Dispatch } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess } from '../redux/authSlice'
import { AppConst } from '@/app-const'
import { toast } from 'react-toastify'
interface SignInFormInputs {
  username: string
  password: string
}

export async function loginUser(payload: SignInFormInputs, dispatch: Dispatch<AnyAction>, navigate: NavigateFunction) {
  try {
    dispatch(loginStart())
    const response = await axiosInstance.post<ResponseLogin>('auth/v1/login', payload)
    const dataJwt: JwtInfo = jwtDecode(response.data.responseData.accessToken)
    const data = {
      ...dataJwt,
      accessToken: response.data.responseData.accessToken,
      refreshToken: response.data.responseData.refreshToken,
      roles: response.data.responseData.roles
    }

    dispatch(loginSuccess(data))
    console.log('data role', data.roles)
    console.log(data.roles.includes('ROLE_ADMIN'))
    if (data.roles.includes('ROLE_ADMIN')) {
      toast.success(response.data.message)
      navigate(AppConst.HOME_ADMIN_URL)
    } else {
      dispatch(loginFailed(AppConst.LOGIN_FAILED_401))
      toast.error("You don't have enough permission")
    }
    return response.data
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 400) {
        const data = error.response.data as any
        toast.error(error.response.data.message)
        dispatch(loginFailed(data.message))
      } else if (error.response.status === 401) {
        dispatch(loginFailed(AppConst.LOGIN_FAILED_401))
        toast.error(error.response.data.message)
        // Account is not active
      } else if (error.response.status === 406) {
        dispatch(loginFailed(error.response.data.message))
        toast.error(error.response.data.message)
      } else if (error.code === 'ERR_NETWORK') {
        dispatch(loginFailed('Network Error'))
      } else {
        dispatch(loginFailed('Internal Error'))
      }
    }
  }
}

export const logOut = async (dispatch: Dispatch<AnyAction>, _navigate: NavigateFunction) => {
  dispatch(logoutStart())
  try {
    dispatch(logoutSuccess('Logout succcess'))
    toast.success('Logged out successfully')
  } catch (error) {
    dispatch(logoutFailed('log out failed'))
    toast.error('Logged out failed')
  }
}
