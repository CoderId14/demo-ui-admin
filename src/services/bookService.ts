import axiosInstance, { ErrorResponse } from "@/config/axios";
import { Book, BookAddInfo, BookParamRequest, BookResponse, BookUpdateInfo } from "@/types/book/book.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const searchBook = async (params: BookParamRequest) => {
    try {
      const res = await axiosInstance.get<BookResponse>("/book/v1/search", {
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
  
  export const updateBook = async (info: BookUpdateInfo) => {
    try {
      const res = await axiosInstance.put<BookResponse>("/book/v1/" + info.id, info);
  
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

  export const addBook = async (info: BookAddInfo) => {
    try {
      const res = await axiosInstance.post<BookResponse>("/book/v1", info);
  
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

  export const deleteBook = async (bookId: string|number) => {
    try {
      const res = await axiosInstance.delete<ApiResponse>("/book/v1/" + bookId);
  
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
  export function useUpdateBook() {
    const queryClient = useQueryClient();
    return useMutation((info: BookUpdateInfo) => updateBook(info), {
      onMutate: async (newBook) => {
        await queryClient.cancelQueries(["books"]);
        const previouBooks = queryClient.getQueryData(['books'])

    // Return a context object with the snapshotted value
        return { previouBooks }
      },
      onError: (err, newBook, context) => {
        queryClient.setQueryData(['books'], context?.previouBooks)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['books'] })
      },
    });
  }
  export function useAddBook() {
    const queryClient = useQueryClient();
    return useMutation((info: BookAddInfo) => addBook(info), {
      onMutate: async (newBook) => {
        await queryClient.cancelQueries(["books"]);
        const previouBooks = queryClient.getQueryData(['books'])
    // Return a context object with the snapshotted value
        return { previouBooks }
      },
      onError: (err, newBook, context) => {
        queryClient.setQueryData(['books'], context?.previouBooks)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['books'] })
      },
    });
  }

  export function useDeleteBook() {
    const queryClient = useQueryClient();
    return useMutation((bookId: string| number) => deleteBook(bookId), {
      onMutate: async (bookId) => {
        await queryClient.cancelQueries(["books"]);
        const previouBooks:BookResponse|undefined = queryClient.getQueryData(['books'])
        if(previouBooks){
          let content:Book[] = previouBooks.content;
          content.filter((book:Book) => book.bookId != bookId)
          previouBooks.content = content;
        }
    // Return a context object with the snapshotted value
        return { previouBooks }
      },
      onError: (err, bookId, context) => {
        queryClient.setQueryData(['books'], context?.previouBooks)
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['books'] })
      },
    });
  }
export function useFetchBooks(params: BookParamRequest) {
    const queryClient = useQueryClient();
  
    const queryKey = ["books", params];
  
    const queryOptions = {
      onSuccess: (data: BookResponse) => {
        queryClient.setQueryData(queryKey, data);
      },
    };
  
    const query = useQuery(queryKey, () => searchBook(params), queryOptions);
  
    return query;
  }
  