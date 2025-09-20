import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACK_URI } from '..'
import type { RtkState } from '../store'
import type { FileUploaded, PageRequest } from '../../entities'
import type { Product, ProductAddModel, ProductUpdateModel, ProductResponse } from '../../entities'


export const ProductApi = createApi({
    reducerPath: 'prod',
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
        rtkGetProduct: builder.mutation<Product, string>({
            query: (id: string) => `/products/${id}`,
        }),
        rtkCreateProduct: builder.mutation<Product, ProductAddModel>({
            query: (product: ProductAddModel) => ({
                url: '/products/',
                method: 'POST',
                body: product,
            }),
        }),
        rtkGetProducts: builder.mutation<ProductResponse, PageRequest>({
            query: (request: PageRequest) => {
                return {
                    url: '/products',
                    params: {
                        pagination: JSON.stringify(request.pagination),
                        sorting: JSON.stringify(request.sorting)
                    }
                }
            },
        }),
        rtkUpdateProduct: builder.mutation<Product, ProductUpdateModel>({
            query: (product: ProductUpdateModel) => ({
                url: `/products/${product.id}`,
                method: 'PATCH',
                body: product,
            }),
        }),
        rtkUploadImage: builder.mutation<FileUploaded, File>({
            query: (file: File) => {
                const body = new FormData();
                body.append('file', file);

                return {
                    url: '/upload',
                    method: 'POST',
                    body: body,
                }
            },
        }),
    })

});

export const { useRtkGetProductMutation, useRtkCreateProductMutation, useRtkUpdateProductMutation, useRtkGetProductsMutation, useRtkUploadImageMutation } = ProductApi