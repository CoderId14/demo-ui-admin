import { API_HOST_NAME } from '@/environments'
import axios, { AxiosInstance } from 'axios'
import { queryClient } from './queryClient'
import { EnhancedStore } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { updateAccessToken } from '@/redux/authSlice'

export type ErrorResponse = {
  message: string
  timestamp: string
  status: number
  error: string
  exception: string
}
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_HOST_NAME,
  // timeout: 2000,
  headers: {
    'content-type': 'application/json'
  }
})

let store: EnhancedStore
export const injectStore = (_store: any) => {
  store = _store
}
axiosInstance.interceptors.request.use(
  async (config: any) => {
    // Do something before request is sent
    const accessToken = store.getState().auth.login.user?.accessToken || ''

    if (accessToken) config.headers['Authorization'] = 'Bearer ' + accessToken
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('error: ', error)
    if (error.code === 'ERR_NETWORK') {
      toast.error(error.message)
    }
    // Handle refresh token logic here
    const originalRequest = error.config
    const { refreshToken } = store.getState().auth.login.user || {}
    if (refreshToken && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Make a request to refresh the access token
        const refreshedTokenResponse = await axiosInstance.post('/auth/v1/refresh-token', {
          refreshToken
        })

        const data = refreshedTokenResponse.data

        // Update the access token in the store and original request headers
        store.dispatch(updateAccessToken(data))
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`

        // Retry the original request
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        // Handle refresh token error
        console.log('Refresh token error: ', refreshError)
        toast.error('Refresh token error')
        // Redirect to login or handle the error as needed
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
