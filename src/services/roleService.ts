import axiosInstance, { ErrorResponse } from "@/config/axios"
import { IRoleSearchParams, IRoleSearchResponse } from "@/types/role.type"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import axios from "axios"

export const searchRole = async (params: IRoleSearchParams) => {
    try {
      const res = await axiosInstance.get<IRoleSearchResponse>('/role/v1/search', {
        headers: {
          'content-type': 'application/json'
        },
        params
      })
  
      return res.data
    } catch (error: any) {
      if (axios.isCancel(error)) {
        // request was cancelled
      } else if (error.response) {
        // server returned an error
        const data = error.response.data as any
        message.error(data.message)
        return { error: data } as ErrorResponse
      } else {
        // network error
        message.error('Network error occurred.')
        return { error: 'Network error occurred.' } as ErrorResponse
      }
    }
  }

  export function useFetchRoles(params: IRoleSearchParams) {
    const queryClient = useQueryClient()
  
    const queryKey = ['user', params]
  
    const queryOptions = {
      onSuccess: (data: IRoleSearchResponse) => {
        queryClient.setQueryData(queryKey, data)
      }
    }
  
    const query = useQuery(queryKey, () => searchRole(params), queryOptions)
  
    return query
  }
  