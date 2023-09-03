import {MapperConfiguration, MappingPair} from "@dynamic-mapper/mapper";
import {
    Order,
    OrderCalculateResponse,
    OrderCalculateResponseDTO,
    OrderResponseDTO,
    OrderStatus,
    PromoStatus
} from "./interfaces";

// orderResponseDtoToOrder
export const orderResponseDtoToOrder = new MappingPair<OrderResponseDTO, Order>();
const configOrderResponseDtoToOrder = new MapperConfiguration(cfg => {
    cfg.createAutoMap(orderResponseDtoToOrder, {
        creationTime: opt => opt.mapFrom(src =>
            new Date(src.creationTime[0], src.creationTime[1] - 1, src.creationTime[2], src.creationTime[3], src.creationTime[4], src.creationTime[5])),
        orderStatus: opt => opt.mapFrom(src => OrderStatus[src.orderStatus as keyof typeof OrderStatus])
    });
});
export const mapperOrderResponseDtoToOrder = configOrderResponseDtoToOrder.createMapper();

// orderCalculateResponseDtoToOrderCalculateResponse
export const orderCalculateResponseDtoToOrderCalculateResponse = new MappingPair<OrderCalculateResponseDTO, OrderCalculateResponse>();
const configOrderCalculateResponseDtoToOrderCalculateResponse = new MapperConfiguration(cfg => {
    cfg.createAutoMap(orderCalculateResponseDtoToOrderCalculateResponse, {
        promoStatus: opt => opt.mapFrom(src => PromoStatus[src.promoStatus as keyof typeof PromoStatus])
    });
});
export const mapperOrderCalculateResponseDtoToOrderCalculateResponse = configOrderCalculateResponseDtoToOrderCalculateResponse.createMapper();