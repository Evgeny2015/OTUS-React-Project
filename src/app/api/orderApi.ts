import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BACK_URI } from "..";
import type { RtkState } from "../store";

import type { PageRequest } from "../../entities";
import type { Order, OrderAddModel, OrderResponse, OrderUpdateModel } from "../../entities";


export const OrderApi = createApi({
    reducerPath: 'order',
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
        rtkGetOrder: builder.mutation<Order, string>({
            query: (id: string) => `/orders/${id}`,
        }),
        rtkCreateOrder: builder.mutation<Order, OrderAddModel>({
            query: (order: OrderAddModel) => ({
                url: '/orders/',
                method: 'POST',
                body: order,
            }),
        }),
        rtkGetOrders: builder.mutation<OrderResponse, PageRequest>({
            query: (request: PageRequest) => {
                return {
                    url: '/orders',
                    params: {
                        pagination: JSON.stringify(request.pagination),
                        sorting: JSON.stringify(request.sorting)
                    }
                }
            },
        }),
        rtkUpdateProduct: builder.mutation<Order, OrderUpdateModel>({
            query: (order: OrderUpdateModel) => ({
                url: `/orders/${order.id}`,
                method: 'PATCH',
                body: order,
            }),
        }),
        rtkDeleteProduct: builder.mutation<Order, string>({
            query: (id: string) => ({
                url: `/orders/${id}`,
                method: 'DELETE'
            }),
        }),
    })

});

export const { useRtkGetOrderMutation, useRtkCreateOrderMutation, useRtkGetOrdersMutation, useRtkUpdateProductMutation, useRtkDeleteProductMutation } = OrderApi;