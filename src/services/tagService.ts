import axiosInstance, { ErrorResponse } from "@/config/axios";
import { TagSearchParams, TagSearchResponse } from "@/types/tag/tag.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const searchTag = async (params: TagSearchParams) => {
    try {
      const res = await axiosInstance.get<TagSearchResponse>("/tag/v1/search", {
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

  
export function useFetchTags(params: TagSearchParams) {
    const queryClient = useQueryClient();
  
    const queryKey = ["tags", params];
  
    const queryOptions = {
      onSuccess: (data: TagSearchResponse) => {
        queryClient.setQueryData(queryKey, data);
      },
    };
  
    const query = useQuery(queryKey, () => searchTag(params), queryOptions);
  
    return query;
  }