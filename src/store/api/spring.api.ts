import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IProduct} from "src/types/interfaces";

export const springApi = createApi({
    reducerPath: "spring/api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://aikishoes.ru/api",
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
        })
    })
})

export const {useGetProductsQuery, useGetProductQuery} = springApi;
