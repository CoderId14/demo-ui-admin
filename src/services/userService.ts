import axiosInstance, { ErrorResponse } from '@/config/axios'
import { ISignUpRequest, IUpdateUserRequest, IUserResponse, IUserSearchParams, IUserSearchResponse } from '@/types/user/user.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import axios from 'axios'
import { toast } from 'react-toastify'

export const searchUser = async (params: IUserSearchParams) => {
  try {
    const res = await axiosInstance.get<IUserSearchResponse>('/user/v1/search', {
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
      toast.error(data.message)
      return { error: data } as ErrorResponse
    } else {
      // network error
      toast.error('Network error occurred.')
      return { error: 'Network error occurred.' } as ErrorResponse
    }
  }
}

export const updateUser = async (info: IUpdateUserRequest) => {
  try {
    const res = await axiosInstance.put<boolean>('/user/v1/', info)
    message.success('Update user successfully')
    return res.data
  } catch (error: any) {
    if (axios.isCancel(error)) {
      // request was cancelled
    } else if (error.response) {
      // server returned an error
      const data = error.response.data as any
      toast.error(data.message)
      return { error: data } as ErrorResponse
    } else {
      // network error
      toast.error('Network error occurred.')
      return { error: 'Network error occurred.' } as ErrorResponse
    }
  }
}

export const addUser = async (info: ISignUpRequest) => {
  try {
    const res = await axiosInstance.post<IUserResponse>('/user/v1/addUser', info)
    message.success('Add user successfully')
    return res.data
  } catch (error: any) {
    if (axios.isCancel(error)) {
      // request was cancelled
    } else if (error.response) {
      // server returned an error
      const data = error.response.data as any
      toast.error(data.message)
      return { error: data } as ErrorResponse
    } else {
      // network error
      toast.error('Network error occurred.')
      return { error: 'Network error occurred.' } as ErrorResponse
    }
  }
}

export const deleteUser = async (id: string | number) => {
  try {
    const res = await axiosInstance.delete<ApiResponse>('/user/v1/' + id)
    message.success('Delete user successfully')
    return res.data
  } catch (error: any) {
    if (axios.isCancel(error)) {
      // request was cancelled
    } else if (error.response) {
      // server returned an error
      const data = error.response.data as any
      toast.error(data.message)
      return { error: data } as ErrorResponse
    } else {
      // network error
      toast.error('Network error occurred.')
      return { error: 'Network error occurred.' } as ErrorResponse
    }
  }
}
export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation((info: IUpdateUserRequest) => updateUser(info), {
    onMutate: async (_newBook) => {
      await queryClient.cancelQueries(['user'])
      const previouBooks = queryClient.getQueryData(['user'])

      // Return a context object with the snapshotted value
      return { previouBooks }
    },
    onError: (_err, _newBook, context) => {
      queryClient.setQueryData(['user'], context?.previouBooks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
}
export function useAddUser() {
  const queryClient = useQueryClient()
  return useMutation((info: ISignUpRequest) => addUser(info), {
    onMutate: async (_newBook) => {
      await queryClient.cancelQueries(['user'])
      const previouBooks = queryClient.getQueryData(['user'])
      // Return a context object with the snapshotted value
      return { previouBooks }
    },
    onError: (_err, _newBook, context) => {
      queryClient.setQueryData(['user'], context?.previouBooks)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation((id: string | number) => deleteUser(id), {
    onMutate: async () => {
      await queryClient.cancelQueries(['user'])
      const previousUser = queryClient.getQueryData(['user'])
      // Return a context object with the snapshotted value
      return { previousUser }
    },
    onError: (_err, _bookId, context) => {
      queryClient.setQueryData(['user'], context?.previousUser)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    }
  })
}
export function useFetchUsers(params: any) {
  const queryClient = useQueryClient()

  const queryKey = ['user', params]

  const queryOptions = {
    onSuccess: (data: IUserSearchResponse) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => searchUser(params), queryOptions)

  return query
}
