import { baseApi } from '../../../app/base-api.ts';
import { SuccessResponse } from '../../../common/types';
import { Tag } from '../types/tags.types.ts';
import { HttpMethod } from '../../../common/enums';

export const tagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query<SuccessResponse<Tag[]>, void>({
      query: () => 'tags',
    }),
    getOneTag: builder.query<SuccessResponse<Tag>, number>({
      query: (id) => `tags/${id}`,
    }),
    getLast3Tags: builder.query<SuccessResponse<Tag[]>, void>({
      query: () => `tags/last-three`,
    }),
    createTag: builder.mutation<SuccessResponse<Tag>, { name: string }>({
      query: ({ name }) => ({
        url: 'tags',
        method: HttpMethod.POST,
        body: { name },
      }),
    }),
  }),
});

export const { useCreateTagMutation, useGetAllTagsQuery, useGetOneTagQuery, useGetLast3TagsQuery } = tagsApi;