import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { get_Categories } from "../../../server/controller/controller/controller";
const baseURI = "http://localhost:8080";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      // get: 'http://localhost:8080/api/categories'
      query: () => "/api/categories",
      providesTags: ["categories"],
    }),
  }),
});

export default apiSlice;

// controller/controller
