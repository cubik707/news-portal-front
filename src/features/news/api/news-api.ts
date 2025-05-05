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
    }),
    getNewsByStatus: builder.query<SuccessResponse<News[]>, NewsStatus>({
      query: (status) => ({
        url: `news/status`,
        params: { status: NewsStatus[status] },
      }),
    }),
    createNews: builder.mutation<SuccessResponse<News>, NewsCreate>({
      query: (NewsCreate) => ({
        url: '/news',
        method: HttpMethod.POST,
        body: NewsCreate,
      }),
    }),
    deleteUser: builder.mutation<SuccessResponse<null>, void>({
      query: (id) => ({
        url: `news/${id}`,
        method: HttpMethod.DELETE,
      }),
    }),
  }),
});

export const {
  useCreateNewsMutation,
  useDeleteUserMutation,
  useGetNewsByCategoryAndStatusQuery,
  useGetNewsByStatusQuery,
} = newsApi;