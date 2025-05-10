import { baseApi } from '../../../app/base-api.ts';
import { SuccessResponse } from '../../../common/types';
import { News, NewsCreate } from '../types/news.types.ts';
import { HttpMethod } from '../../../common/enums';
import { NewsStatus } from '../types/news-status.enum.ts';

export const newsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNewsByCategoryAndStatus: builder.query<SuccessResponse<News[]>, { categoryId: number, status: NewsStatus }>({
      query: ({ categoryId, status }) => ({
        url: `news/category/${categoryId}/status`,
        params: { status },
      }),
      providesTags: (_result, _error, { categoryId, status }) => [
        { type: 'News' as const, id: `CATEGORY_${categoryId}_STATUS_${status}` },
      ],
    }),
    getNewsByStatus: builder.query<SuccessResponse<News[]>, NewsStatus>({
      query: (status) => ({
        url: `news/status`,
        params: { status: NewsStatus[status] },
      }),
      providesTags: (_result, _error, status) => [
        { type: 'News' as const, id: `STATUS_${status}` },
      ],
    }),
    getOneNews: builder.query<SuccessResponse<News>, number>({
      query: (id) => `news/${id}`
    }),
    createNews: builder.mutation<SuccessResponse<News>, NewsCreate>({
      query: (NewsCreate) => ({
        url: '/news',
        method: HttpMethod.POST,
        body: NewsCreate,
      }),
    }),
    deleteNews: builder.mutation<SuccessResponse<null>, number>({
      query: (id) => ({
        url: `news/${id}`,
        method: HttpMethod.DELETE,
      }),
      invalidatesTags: (_result, _error, _id) => [
        { type: 'News' as const },
      ],
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useGetNewsByCategoryAndStatusQuery,
  useGetNewsByStatusQuery,
  useGetOneNewsQuery
} = newsApi;