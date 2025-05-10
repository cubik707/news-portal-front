import { baseApi } from '../../../app/base-api.ts';
import { SuccessResponse } from '../../../common/types';

export const uploadApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<SuccessResponse<string>, FormData>({
      query: (body) => ({
        url: '/upload',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadApi;