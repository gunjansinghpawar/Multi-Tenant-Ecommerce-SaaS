import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      // Setup auth headers if needed
      return headers;
    },
  }),
  tagTypes: ['User', 'Tenant', 'Order', 'Product'],
  endpoints: (builder) => ({
    getMetrics: builder.query({
      query: () => 'metrics',
      providesTags: ['Order', 'Product'],
    }),
  }),
});

export const { useGetMetricsQuery } = baseApi;
