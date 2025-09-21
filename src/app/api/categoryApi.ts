import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACK_URI } from '..'
import type { RtkState } from '../store'
import type { Category, CategoryAddModel, CategoryUpdateModel, PageRequest } from '../../entities'
import type { CategoryResponse } from '../../entities'


export const CategoryApi = createApi({
    reducerPath: 'category',
    baseQuery: fetchBaseQuery({
        baseUrl: BACK_URI,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RtkState).token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        rtkGetCategory: builder.mutation<Category, string>({
            query: (id: string) => `/categories/${id}`,
        }),
        rtkCreateCategory: builder.mutation<Category, CategoryAddModel>({
            query: (product: CategoryAddModel) => ({
                url: '/categories/',
                method: 'POST',
                body: product,
            }),
        }),
        rtkDeleteCategory: builder.mutation<Category, string>({
            query: (id: string) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
        }),
        rtkGetCategorys: builder.query<CategoryResponse, PageRequest>({
            query: (request: PageRequest) => {
                return {
                    url: '/categories',
                    params: {
                        pagination: JSON.stringify(request.pagination),
                        sorting: JSON.stringify(request.sorting)
                    }
                }
            },
        }),
        rtkUpdateCategory: builder.mutation<Category, CategoryUpdateModel>({
            query: (product: CategoryUpdateModel) => ({
                url: `/categories/${product.id}`,
                method: 'PATCH',
                body: product,
            }),
        }),
    })

});

export const { useRtkGetCategoryMutation, useRtkCreateCategoryMutation, useRtkUpdateCategoryMutation, useRtkGetCategorysQuery, useRtkDeleteCategoryMutation } = CategoryApi