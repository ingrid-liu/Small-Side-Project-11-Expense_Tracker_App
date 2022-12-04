import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { get_Categories } from "../../../server/controller/controller";
const baseURI = "http://localhost:8080";
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseURI: baseURI,
    endpoints: (builder) => {
      get_Categories: builder.query({
        // get:"http://localhost:8080/api/categories"
        query: () => "/api/categories",
      });
    },
  }),
});

export default apiSlice;
