import axiosInstance, { ErrorResponse } from "@/config/axios"
import { IBookWriterSearchParams, IBookWriterSearchResponse, IUpdateBookWriterRequest, IUpdateWriterPromoteRequest, IWriterPromoteSearchParams, IWriterPromoteSearchResponse } from "@/types/writer/writer.request.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { message } from "antd"
import axios from "axios"

export const updateBookWriterRequest = async (info: IUpdateBookWriterRequest) => {
    try {
      await axiosInstance.put<void>('/writer/book/v1/' + info.id, info)
      message.success('Update successfully')
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
  export function useUpdateBookWriterRequest() {
    const queryClient = useQueryClient()
    return useMutation((info: IUpdateBookWriterRequest) => updateBookWriterRequest(info), {
      onMutate: async (_newBook) => {
        await queryClient.cancelQueries(['book-writer-request'])
        const previouBooks = queryClient.getQueryData(['book-writer-request'])
        // Return a context object with the snapshotted value
        return { previouBooks }
      },
      onError: (_err, _newBook, context) => {
        queryClient.setQueryData(['book-writer-request'], context?.previouBooks)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['book-writer-request'] })
      }
    })
  }
export const searchBookWriterRequest = async (params: IBookWriterSearchParams) => {
    try {
      const res = await axiosInstance.get<IBookWriterSearchResponse>('/writer/book/v1/search', {
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

  export const searchWriterPromote = async (params: IWriterPromoteSearchParams) => {
    try {
      const res = await axiosInstance.get<IWriterPromoteSearchResponse>('/writer/book/v1/search/promote', {
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

  export function useFetchBookWriterRequest(params: IBookWriterSearchParams) {
    const queryClient = useQueryClient()
  
    const queryKey = ['book-writer-request', params]
  
    const queryOptions = {
      onSuccess: (data: IBookWriterSearchResponse) => {
        queryClient.setQueryData(queryKey, data)
      }
    }
  
    const query = useQuery(queryKey, () => searchBookWriterRequest(params), queryOptions)
  
    return query
  }

  export function useFetchWriterPromoteRequest(params: IWriterPromoteSearchParams) {
    const queryClient = useQueryClient()
  
    const queryKey = ['writer-promote', params]
  
    const queryOptions = {
      onSuccess: (data: IWriterPromoteSearchResponse) => {
        queryClient.setQueryData(queryKey, data)
      }
    }
  
    const query = useQuery(queryKey, () => searchWriterPromote(params), queryOptions)
  
    return query
  }
  
  

  export const updateWriterPromoteRequest = async (info: IUpdateWriterPromoteRequest) => {
    try {
      await axiosInstance.put<void>('/writer/book/v1/promote/' + info.id, info)
      message.success('Update successfully')
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

  export function useUpdateWriterPromoteRequest() {
    const queryClient = useQueryClient()
    return useMutation((info: IUpdateWriterPromoteRequest) => updateWriterPromoteRequest(info), {
      onMutate: async (_newBook) => {
        await queryClient.cancelQueries(['writer-promote'])
        const previouBooks = queryClient.getQueryData(['writer-promote'])
        // Return a context object with the snapshotted value
        return { previouBooks }
      },
      onError: (_err, _newBook, context) => {
        queryClient.setQueryData(['writer-promote'], context?.previouBooks)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['writer-promote'] })
      }
    })
  }