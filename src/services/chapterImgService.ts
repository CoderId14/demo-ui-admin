import axiosInstance, { ErrorResponse } from '@/config/axios'
import { Chapter } from '@/types/chapter/chapter.type'
import { ChapterImgList, ChapterImgSearchParams, ChapterImgSearchResponse, IChapterImg, SaveBulkChapterRequest } from '@/types/chapter/chapterImg.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'

export const searchChapterImg = async (params: ChapterImgSearchParams) => {
  try {
    const res = await axiosInstance.get<ChapterImgSearchResponse>('/chapterImg/v1/search/' + params.chapterId, {
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

export const getChapter = async (chapterId: string | number) => {
  try {
    const res = await axiosInstance.get<Chapter>('/chapter/v1/' + chapterId, {
      headers: {
        'content-type': 'application/json'
      }
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

export const updateChapter = async (info: Chapter) => {
  try {
    const res = await axiosInstance.put<Chapter>('/chapter/v1/' + Number(info.id), info)

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

export const addChapterImg = async (info: IChapterImg) => {
  try {
    const res = await axiosInstance.post<IChapterImg>('/chapterImg/v1/add', info)

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

export const saveBulkChapterImg = async (info: SaveBulkChapterRequest) => {
    try {
      const res = await axiosInstance.post<boolean>('/chapterImg/v1/saveBulk', info)
  
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
export const deleteChapter = async (chapterId: string | number) => {
  try {
    const res = await axiosInstance.delete<ApiResponse>('/chapter/v1/' + chapterId)

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
export function useFetchChapter(chapterId: string | number) {
  const queryClient = useQueryClient()

  const queryKey = ['chapter', chapterId]

  const queryOptions = {
    onSuccess: (data: Chapter) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => getChapter(chapterId), queryOptions)

  return {
    status: query.status,
    data: query.data,
    error: query.error,
    isFetching: query.isFetching
  }
}
export function useUpdateChapter() {
  const queryClient = useQueryClient()
  return useMutation((info: Chapter) => updateChapter(info), {
    onMutate: async (info) => {
      await queryClient.cancelQueries(['chapter', info.id])
      const previouChapter = queryClient.getQueryData(['chapter', info.id])

      // Return a context object with the snapshotted value
      return { previouChapter }
    },
    onError: (_err, info, context) => {
      queryClient.setQueryData(['chapter', info.id], context?.previouChapter)
    },
    onSettled: (_info) => {
      queryClient.invalidateQueries({ queryKey: ['chapters'] })
    }
  })
}
export function useAddChapterImg() {
  const queryClient = useQueryClient()
  return useMutation((info: IChapterImg) => addChapterImg(info), {
    onMutate: async (info) => {
      await queryClient.cancelQueries(['chapterImg', info.id])
      const previouChapter = queryClient.getQueryData(['chapterImg', info.id])

      // Return a context object with the snapshotted value
      return { previouChapter }
    },
    onError: (_err, info, context) => {
      queryClient.setQueryData(['chapterImg', info.id], context?.previouChapter)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chapterImg'] })
    }
  })
}
export function useSaveBulkChapterImg() {
    const queryClient = useQueryClient()
    return useMutation((info: SaveBulkChapterRequest) => saveBulkChapterImg(info), {
      onMutate: async (_info) => {
        await queryClient.cancelQueries(['chapterImg'])
        const previouChapter = queryClient.getQueryData(['chapterImg'])
  
        // Return a context object with the snapshotted value
        return { previouChapter }
      },
      onError: (_err, _info, context) => {
        queryClient.setQueryData(['chapterImg'], context?.previouChapter)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['chapterImg'] })
      }
    })
  }
export function useDeleteBook() {
  const queryClient = useQueryClient()
  return useMutation((chapterId: string | number) => deleteChapter(chapterId), {
    onMutate: async (chapterId) => {
      await queryClient.cancelQueries(['chapters'])
      const previouChapter: Chapter | undefined = queryClient.getQueryData(['chapter', chapterId])

      // Return a context object with the snapshotted value
      return { previouChapter }
    },
    onError: (_err, chapterId, context) => {
      queryClient.setQueryData(['chapter', chapterId], context?.previouChapter)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['chapters'] })
    }
  })
}
export function useFetchChaptersImg(params: ChapterImgSearchParams) {
  const queryClient = useQueryClient()

  const queryKey = ['chapterImg', params]

  const queryOptions = {
    onSuccess: (data: ChapterImgList) => {
      queryClient.setQueryData(queryKey, data)
    }
  }

  const query = useQuery(queryKey, () => searchChapterImg(params), queryOptions)

  return {
    status: query.status,
    data: query.data,
    error: query.error,
    isFetching: query.isFetching
  }
}
