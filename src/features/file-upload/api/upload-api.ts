import { baseApi } from '../../../app/base-api.ts';
import { SuccessResponse } from '../../../common/types';
import { HttpMethod } from '../../../common/enums';

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<SuccessResponse<string>, FormData>({
      query: (body) => ({
        url: '/upload',
        method: HttpMethod.POST,
        body,
      }),
    }),
    deleteImage: builder.mutation<SuccessResponse<null>, FormData>({
      query: (body) => ({
        url: '/delete-image',
        method: HttpMethod.DELETE,
        body
      })
    })
  }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = uploadApi;