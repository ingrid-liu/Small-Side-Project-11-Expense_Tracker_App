import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { get_Categories } from "../../../server/controller/controller/controller";
const baseURI = "http://localhost:8080";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    
    // get categories
    getCategories: builder.query({
      // GET: 'http://localhost:8080/api/categories'
      query: () => "/api/categories",
    }),

    // get labels
    getLabels: builder.query({
      // GET: 'http://localhost:8080/api/labels'
      query: () => "/api/labels",
      providesTags: ["transaction"], //-->  group the data together
    }),

    // add new Transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        // POST: 'http://localhost:8080/api/labels'
        url: "/api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    // delete record
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
        // DELETE: 'http://localhost:8080/api/tansaction'
        url: "/api/transaction",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ["transaction"],
    }),

    // get user - check occupancy
    validateUserLogin: builder.mutation({
      query: (data) => ({
        // POST: 'http://localhost:8080/api/users'
        url: "/api/users",
        method: "POST",
        body: data,
      }),
    }),

    createNewUser: builder.mutation({
      query: (data) => ({
        // PUT: 'http://localhost:8080/api/users'
        url: "/api/users",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export default apiSlice;
