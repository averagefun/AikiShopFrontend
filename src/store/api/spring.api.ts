import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    LoginDTO,
    RegisterDTO,
    LoginResponse,
    Order,
    OrderCreateResponseDTO,
    OrderRequestDTO,
    OrderResponseDTO,
    Product, Customer, MessageDTO, AuthState
}
    from "src/types/interfaces";
import {mapperOrderResponseDtoToOrder, orderResponseDtoToOrder} from "src/types/mappers";

const jwtToken = () => localStorage.getItem("jwtToken");

export const springApi = createApi({
    reducerPath: "spring/api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_SPRING_URL,
    }),
    endpoints: build => ({
        getProducts: build.query<Product[], null>({
            query: () => ({
                url: "/products"
            })
        }),
        getProduct: build.query<Product, number>({
            query: (id: number) => ({
                url: `/products/${id}`
            })
        }),
        generatePassword: build.mutation<MessageDTO, RegisterDTO>({
            query: (body) => ({
                url: "/auth/genpass",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })
        }),
        login: build.mutation<LoginResponse, LoginDTO>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })
        }),
        checkAuth: build.query <AuthState, null>({
            query: () => ({
                url: "/user",
                headers: {
                    "Authorization": `Bearer ${jwtToken()}`
                }
            }),
            transformResponse: (customer: Customer): AuthState => {
                return {
                    isAuthorized: true,
                    customer: customer
                }
            },
            transformErrorResponse: (): AuthState => {
                return {
                    isAuthorized: false,
                    customer: null
                }
            }

        }),
        createOrder: build.mutation<OrderCreateResponseDTO, OrderRequestDTO>({
            query: (body) => ({
                url: "/orders/create",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken()}`
                },
                body
            })
        }),
        getOrders: build.query<Order[], null>({
            query: () => ({
                url: `/orders`,
                headers: {
                    "Authorization": `Bearer ${jwtToken()}`
                }
            }),
            transformResponse: (response: OrderResponseDTO[]): Order[] => {
                return response.map((orderResponseDTO) =>
                    mapperOrderResponseDtoToOrder.map(orderResponseDtoToOrder, orderResponseDTO));
            }
        }),
    })
})

export const {
    useGetProductsQuery, useGetProductQuery,
    useGeneratePasswordMutation, useLoginMutation,
    useCheckAuthQuery,
    useCreateOrderMutation, useGetOrdersQuery
} = springApi;
