import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-server-xi.vercel.app/api", 
  }),
  tagTypes: ["Book", "Borrow"],
  endpoints: () => ({}),
});
