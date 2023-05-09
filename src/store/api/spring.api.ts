import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IOrder, IOrderRegisterResponse, IOrderRest, IProduct} from "src/types/interfaces";

export const springApi = createApi({
    reducerPath: "spring/api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_SPRING_URL,
    }),
    endpoints: build => ({
        getProducts: build.query<IProduct[], null>({
            query: () => ({
                url: "/products"
            })
        }),
        getProduct: build.query<IProduct, number>({
            query: (id: number) => ({
                url: `/products/${id}`
            })
        }),
        createOrder: build.mutation<IOrderRegisterResponse, IOrderRest>({
            query: (body) => ({
                url: "/orders/create",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })
         }),
        getOrderStatus: build.query<IOrder, number>({
            query: (id: number) => ({
                url: `/orders/${id}`
            }),
            transformResponse: (response: IOrder): IOrder => {
                response.creationTime = new Date(response.creationTime);
                return response;
            }
        }),
    })
})

export const {useGetProductsQuery, useGetProductQuery, useCreateOrderMutation, useGetOrderStatusQuery} = springApi;
