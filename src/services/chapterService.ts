import axiosInstance, { ErrorResponse } from "@/config/axios";
import { Chapter, ChapterSearchParams, ChapterSearchResponse } from "@/types/chapter/chapter.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const searchChapter = async (params: ChapterSearchParams) => {
    try {
      const res = await axiosInstance.get<ChapterSearchResponse>(
        "/chapter/v1/search",
        {
          headers: {
            "content-type": "application/json",
          },
          params,
        },
      );
  
      return res.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        // request was cancelled
      } else if (error.response) {
        // server returned an error
        const data = error.response.data as any;
        toast.error(data.message);
        return { error: data } as ErrorResponse;
      } else {
        // network error
        toast.error("Network error occurred.");
        return { error: "Network error occurred." } as ErrorResponse;
      }
    }
  };
  
  export const getChapter = async (chapterId: string|number) => {
    try {
      const res = await axiosInstance.get<Chapter>(
        "/chapter/v1/" + chapterId,
        {
          headers: {
            "content-type": "application/json",
          }
        },
      );
  
      return res.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        // request was cancelled
      } else if (error.response) {
        // server returned an error
        const data = error.response.data as any;
        toast.error(data.message);
        return { error: data } as ErrorResponse;
      } else {
        // network error
        toast.error("Network error occurred.");
        return { error: "Network error occurred." } as ErrorResponse;
      }
    }
  };

  export const updateChapter = async (info: Chapter) => {
    try {
      const res = await axiosInstance.put<Chapter>("/chapter/v1/" + Number(info.id), info);
  
      return res.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        // request was cancelled
      } else if (error.response) {
        // server returned an error
        const data = error.response.data as any;
        toast.error(data.message);
        return { error: data } as ErrorResponse;
      } else {
        // network error
        toast.error("Network error occurred.");
        return { error: "Network error occurred." } as ErrorResponse;
      }
    }
  };

  export const addChapter = async (info: Chapter) => {
    try {
      const res = await axiosInstance.post<Chapter>("/chapter/v1/add", info);
  
      return res.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        // request was cancelled
      } else if (error.response) {
        // server returned an error
        const data = error.response.data as any;
        toast.error(data.message);
        return { error: data } as ErrorResponse;
      } else {
        // network error
        toast.error("Network error occurred.");
        return { error: "Network error occurred." } as ErrorResponse;
      }
    }
  };
  export const deleteChapter = async (chapterId: string|number) => {
    try {
      const res = await axiosInstance.delete<ApiResponse>("/chapter/v1/" + chapterId);
  
      return res.data;
    } catch (error: any) {
      if (axios.isCancel(error)) {
        // request was cancelled
      } else if (error.response) {
        // server returned an error
        const data = error.response.data as any;
        toast.error(data.message);
        return { error: data } as ErrorResponse;
      } else {
        // network error
        toast.error("Network error occurred.");
        return { error: "Network error occurred." } as ErrorResponse;
      }
    }
  };
  export function useFetchChapter(chapterId: string| number) {
    const queryClient = useQueryClient();
  
    const queryKey = ["chapter", chapterId];
  
    const queryOptions = {
      onSuccess: (data: Chapter) => {
        queryClient.setQueryData(queryKey, data);
      },
    };
  
    const query = useQuery(queryKey, () => getChapter(chapterId), queryOptions);
  
    return {
      status: query.status,
      data: query.data,
      error: query.error,
      isFetching: query.isFetching,
    };
  }
  export function useUpdateChapter() {
    const queryClient = useQueryClient();
    return useMutation((info: Chapter) => updateChapter(info), {
      onMutate: async (info) => {
        await queryClient.cancelQueries(["chapter", info.id]);
        const previouChapter = queryClient.getQueryData(['chapter', info.id])

    // Return a context object with the snapshotted value
        return { previouChapter }
      },
      onError: (_err, info, context) => {
        queryClient.setQueryData(['chapter', info.id], context?.previouChapter)
      },
      onSettled: (_info) => {
        queryClient.invalidateQueries({ queryKey: ['chapters'] })
      },
    });
  }
  export function useAddChapter() {
    const queryClient = useQueryClient();
    return useMutation((info: Chapter) => addChapter(info), {
      onMutate: async (info) => {
        await queryClient.cancelQueries(["chapter", info.id]);
        const previouChapter = queryClient.getQueryData(['chapter', info.id])

    // Return a context object with the snapshotted value
        return { previouChapter }
      },
      onError: (_err, info, context) => {
        queryClient.setQueryData(['chapter', info.id], context?.previouChapter)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['chapters'] })
      },
    });
  }

  export function useDeleteBook() {
    const queryClient = useQueryClient();
    return useMutation((chapterId: string| number) => deleteChapter(chapterId), {
      onMutate: async (chapterId) => {
        await queryClient.cancelQueries(["chapters"]);
        const previouChapter:Chapter|undefined = queryClient.getQueryData(['chapter', chapterId])
        
    // Return a context object with the snapshotted value
        return { previouChapter }
      },
      onError: (_err, chapterId, context) => {
        queryClient.setQueryData(['chapter', chapterId], context?.previouChapter)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['chapters'] })
      },
    });
  }
export function useFetchChapters(params: ChapterSearchParams) {
    const queryClient = useQueryClient();
  
    const queryKey = ["chapters", params];
  
    const queryOptions = {
      onSuccess: (data: ChapterSearchResponse) => {
        queryClient.setQueryData(queryKey, data);
      },
    };
  
    const query = useQuery(queryKey, () => searchChapter(params), queryOptions);
  
    return {
      status: query.status,
      data: query.data,
      error: query.error,
      isFetching: query.isFetching,
    };
  }