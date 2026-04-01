import { baseApi } from '../../../app/base-api.ts';
import { SuccessResponse } from '../../../common/types';
import { Comment } from '../types/comment.types.ts';
import { HttpMethod } from '../../../common/enums';

export const commentsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCommentsByNews: builder.query<SuccessResponse<Comment[]>, string>({
      query: newsId => `news/${newsId}/comments`,
      providesTags: (_result, _error, newsId) => [{ type: 'Comment' as const, id: newsId }],
    }),
    getLastComments: builder.query<SuccessResponse<Comment[]>, void>({
      query: () => `comments/last`,
      providesTags: [{ type: 'Comment' as const, id: 'LAST' }],
    }),
    createComment: builder.mutation<SuccessResponse<Comment>, { newsId: string; content: string }>({
      query: ({ newsId, content }) => ({
        url: `news/${newsId}/comments`,
        method: HttpMethod.POST,
        body: { content },
      }),
      invalidatesTags: (_result, _error, { newsId }) => [{ type: 'Comment' as const, id: newsId }],
    }),
    updateComment: builder.mutation<
      SuccessResponse<Comment>,
      { id: string; content: string; newsId: string }
    >({
      query: ({ id, content }) => ({
        url: `comments/${id}`,
        method: HttpMethod.PUT,
        body: { content },
      }),
      invalidatesTags: (_result, _error, { newsId }) => [{ type: 'Comment' as const, id: newsId }],
    }),
    deleteComment: builder.mutation<SuccessResponse<null>, { id: string; newsId: string }>({
      query: ({ id }) => ({
        url: `comments/${id}`,
        method: HttpMethod.DELETE,
      }),
      invalidatesTags: (_result, _error, { newsId }) => [{ type: 'Comment' as const, id: newsId }],
    }),
  }),
});

export const {
  useGetCommentsByNewsQuery,
  useGetLastCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
