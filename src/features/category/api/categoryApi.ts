import { baseApi } from '../../../app/base-api.ts';
import { SuccessResponse } from '../../../common/types';
import { Category } from '../types/category.types.ts';
import { HttpMethod } from '../../../common/enums';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<SuccessResponse<Category[]>, void>({
      query: () => 'categories',
    }),
    getOneCategory: builder.query<SuccessResponse<Category>, number>({
      query: (id) => ({
        url: `categorys/${id}`,
      }),
    }),
    createCategory: builder.mutation<SuccessResponse<Category>, { name: string }>({
      query: (name) => ({
        url: 'categories',
        method: HttpMethod.POST,
        body: {
          name,
        },
      }),
    }),
    updateCategory: builder.mutation<SuccessResponse<Category>, { id: number, name: string }>({
      query: ({ id, name }) => ({
        url: `categories/${id}`,
        method: HttpMethod.PUT,
        body: {
          name,
        },
      }),
    }),
    deleteCategory: builder.mutation<SuccessResponse<null>, number>({
      query: (id) => ({
        url: `categories/${id}`,
        method: HttpMethod.DELETE,
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetOneCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApi;