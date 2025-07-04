import type { IBooksResponse, IQueryParams } from "../../types/bookType";
import { api } from "./apiSlice";

const bookApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllBooks: builder.query<IBooksResponse, IQueryParams>({
            query: ({ page = 1, limit = 10 } = {}) => `/books?page=${page}&limit=${limit}`,
            providesTags: ["Book"],
        }),

        getSingleBook: builder.query({
            query: (id: string) => `/books/${id}`,
            providesTags: ["Book"],
        }),
        addBook: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData,
            }),
            invalidatesTags: ["Book"],
        }),
        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Book"],
        }),
        deleteBook: builder.mutation({
            query: (id: string) => ({
                url: `/books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Book"],
        }),
    }),
});

export const {
    useGetAllBooksQuery,
    useGetSingleBookQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApi;
