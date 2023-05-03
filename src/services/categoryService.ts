import axiosInstance, { ErrorResponse } from "@/config/axios";
import { Category, CategorySearchParams, CategorySearchResponse } from "@/types/category/category.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const searchCategory = async (params: CategorySearchParams) => {
    try {
      const res = await axiosInstance.get<CategorySearchResponse>("/category/v1/search", {
        headers: {
          "content-type": "application/json",
        },
        params,
      });
  
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
  export const updateCategory = async (info: Category) => {
    try {
      const res = await axiosInstance.put<Category>("/category/v1/" + Number(info.categoryId), info);
  
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

  export const addCategory = async (info: Category) => {
    try {
      const res = await axiosInstance.post<Category>("/category/v1/add", info);
  
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

  export const deleteCategory = async (categoryId: string|number) => {
    try {
      const res = await axiosInstance.delete<ApiResponse>("/category/v1/" + categoryId);
  
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
  export function useUpdateCategory() {
    const queryClient = useQueryClient();
    return useMutation((info: Category) => updateCategory(info), {
      onMutate: async (_info) => {
        await queryClient.cancelQueries(["categories"]);
        const previousCategories = queryClient.getQueryData(['categories'])

    // Return a context object with the snapshotted value
        return { previousCategories: previousCategories }
      },
      onError: (_err, _info, context) => {
        queryClient.setQueryData(['categories'], context?.previousCategories)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] })
      },
    });
  }
  export function useAddCategory() {
    const queryClient = useQueryClient();
    return useMutation((info: Category) => addCategory(info), {
      onMutate: async (_info) => {
        await queryClient.cancelQueries(["categories"]);
        const previousCategories = queryClient.getQueryData(['categories'])
    // Return a context object with the snapshotted value
        return { previousCategories }
      },
      onError: (_err, _info, context) => {
        queryClient.setQueryData(['categories'], context?.previousCategories)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] })
      },
    });
  }

  export function useDeleteCategory() {
    const queryClient = useQueryClient();
    return useMutation((categoryId: string| number) => deleteCategory(categoryId), {
      onMutate: async (_categoryId) => {
        await queryClient.cancelQueries(["categories"]);
        const previousCategories:ApiResponse|undefined = queryClient.getQueryData(['categories'])
    // Return a context object with the snapshotted value
        return { previousCategories }
      },
      onError: (_err, _bookId, context) => {
        queryClient.setQueryData(['categories'], context?.previousCategories)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] })
      },
    });
  }
  
export function useFetchCategories(params: CategorySearchParams) {
    const queryClient = useQueryClient();
  
    const queryKey = ["categories", params];
  
    const queryOptions = {
      onSuccess: (data: CategorySearchResponse) => {
        queryClient.setQueryData(queryKey, data);
      },
    };
  
    const query = useQuery(queryKey, () => searchCategory(params), queryOptions);
  
    return query;
  }