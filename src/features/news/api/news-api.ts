import { baseApi } from '../../../app/base-api.ts';
import { SuccessResponse } from '../../../common/types';
import { News, NewsCreate, NewsUpdate } from '../types/news.types.ts';
import { HttpMethod } from '../../../common/enums';
import { NewsStatus } from '../types/news-status.enum.ts';

export const newsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getNewsByCategoryAndStatus: builder.query<SuccessResponse<News[]>, { categoryId: string, status: NewsStatus }>({
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
    getNewsByStatusAndAuthorId: builder.query<SuccessResponse<News[]>, {status: NewsStatus, authorId: string}>({
      query: ({status, authorId}) => ({
        url: `news/author/${authorId}/status`,
        params: { status: NewsStatus[status] },
      }),
      providesTags: (_result, _error, status) => [
        { type: 'News' as const, id: `STATUS_${status}` },
      ],
    }),
    getOneNews: builder.query<SuccessResponse<News>, string>({
      query: (id) => `news/${id}`
    }),
    createNews: builder.mutation<SuccessResponse<News>, NewsCreate>({
      query: (NewsCreate) => ({
        url: '/news',
        method: HttpMethod.POST,
        body: NewsCreate,
      }),
    }),
    deleteNews: builder.mutation<SuccessResponse<null>, string>({
      query: (id) => ({
        url: `news/${id}`,
        method: HttpMethod.DELETE,
      }),
      invalidatesTags: (_result, _error, _id) => [
        { type: 'News' as const },
      ],
    }),
    updateNews: builder.mutation<SuccessResponse<News>, {newsUpdated: NewsUpdate, id: string}>({
      query: ({ id, newsUpdated }) => ({
        url: `news/${id}`,
        method: HttpMethod.PUT,
        body: {
          newsUpdated,
        }
      }),
    })
  }),
});

export const {
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
  useGetNewsByCategoryAndStatusQuery,
  useGetNewsByStatusQuery,
  useGetNewsByStatusAndAuthorIdQuery,
  useGetOneNewsQuery
} = newsApi;