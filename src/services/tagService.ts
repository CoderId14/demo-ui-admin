import axiosInstance, { ErrorResponse } from '@/config/axios'
import { ITag, TagSearchParams, TagSearchResponse } from '@/types/tag/tag.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

export const searchTag = async (params: TagSearchParams) => {
  try {
    const res = await axiosInstance.get<TagSearchResponse>('/tag/v1/search', {
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
export const updateTag = async (info: ITag) => {
  try {
    const res = await axiosInstance.put<ITag>('/tag/v1/' + Number(info.tagId), info)

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

export const addTag = async (info: ITag) => {
  try {
    const res = await axiosInstance.post<ITag>('/tag/v1/add', info)

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

export const deleteTag = async (tagId: string | number) => {
  try {
    const res = await axiosInstance.delete<ApiResponse>('/tag/v1/' + tagId)

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
export function useUpdateTag() {
  const queryClient = useQueryClient()
  return useMutation((info: ITag) => updateTag(info), {
    onMutate: async (_info) => {
      await queryClient.cancelQueries(['tags'])
      const previousTags = queryClient.getQueryData(['tags'])

      // Return a context object with the snapshotted value
      return { previousTags: previousTags }
    },
    onError: (_err, _info, context) => {
      queryClient.setQueryData(['tags'], context?.previousTags)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    }
  })
}
export function useAddTag() {
  const queryClient = useQueryClient()
  return useMutation((info: ITag) => addTag(info), {
    onMutate: async (_info) => {
      await queryClient.cancelQueries(['tags'])
      const previousTags = queryClient.getQueryData(['tags'])
      // Return a context object with the snapshotted value
      return { previousTags }
    },
    onError: (_err, _info, context) => {
      queryClient.setQueryData(['tags'], context?.previousTags)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    }
  })
}

export function useDeleteTag() {
  const queryClient = useQueryClient()
  return useMutation((categoryId: string | number) => deleteTag(categoryId), {
    onMutate: async (_categoryId) => {
      await queryClient.cancelQueries(['tags'])
      const previousTags: ApiResponse | undefined = queryClient.getQueryData(['tags'])
      // Return a context object with the snapshotted value
      return { previousTags }
    },
    onError: (_err, _bookId, context) => {
      queryClient.setQueryData(['tags'], context?.previousTags)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] })
    }
  })
}
export function useFetchTags(params: TagSearchParams) {
  const queryClient = useQueryClient()

  const queryKey = ['tags', params]

  const queryOptions = {
    onSuccess: (data: TagSearchResponse) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => searchTag(params), queryOptions)

  return query
}
