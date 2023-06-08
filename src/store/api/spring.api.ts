import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// import { MappingPair, MapperConfiguration } from '@dynamic-mapper/mapper'
import {IOrder, IOrderRegisterResponse, IOrderRequestDTO, IOrderResponseDTO, IProduct} from "src/types/interfaces";

const jwtToken = localStorage.getItem("jwtToken");

// const CustomerDtoToCustomer = new MappingPair<CustomerDto, Customer>();
//
// const configuration = new MapperConfiguration(cfg => {
//     cfg.createAutoMap(CustomerDtoToCustomer, {
//         fullName: opt => opt.mapFrom(src => `${src.firstName} ${src.lastName}`)
//     });
// });
//
// const mapper = configuration.createMapper();
//
// const customerDto: CustomerDto = {
//     firstName: 'John',
//     lastName: 'Doe'
// };

// const orderResponseDtoToOrder = new MappingPair<IOrderResponseDTO, IOrder>();
//
// const configuration = new MapperConfiguration( => {
//     cfg.createAutoMap(orderResponseDtoToOrder, {
//     });
// });

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
        createOrder: build.mutation<IOrderRegisterResponse, IOrderRequestDTO>({
            query: (body) => ({
                url: "/orders/create",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwtToken}`
                },
                body
            })
         }),
        getOrders: build.query<IOrder[], null>({
            query: () => ({
                url: `/orders`,
                headers: {
                    "Authorization": `Bearer ${jwtToken}`
                }
            }),
            transformResponse: (response: IOrder[]): IOrder[] => {
                response.forEach(order => {
                    order.creationTime = new Date(order.creationTime);
                })
                return response;
            }
        }),
    })
})

export const {useGetProductsQuery, useGetProductQuery,
    useCreateOrderMutation, useGetOrdersQuery} = springApi;
