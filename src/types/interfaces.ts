export interface IFeatureSlide {
    alt: string;
    imagePath: string;
}

export interface IProductSize {
    id: number;
    article: string;
    size: string;
    count: number;
}

export interface IProductImage {
    id?: number;
    imagePath: string;
    alt: string;
    priority: number;
}

export interface IProductFeature {
    id?: number;
    feature: string;
    priority: number;
}

export interface IProduct {
    id: number;
    name: string;
    oldPrice?: number;
    price: number;
    sizes: IProductSize[];
    images: IProductImage[];
    features: IProductFeature[];
}

export interface ICartItem {
    productId: number;
    sizes: IProductSize[];
}

export interface ICartItemChangeEvent {
    productId: number;
    sizeId: number;
    article: string;
    size: string;
}

export interface IOrder {
    id: number;
    creationTime: Date;
    amount: number;
    orderStatus: OrderStatus;
    phone: string;
    selectedSizes: IProductSize[];
}

export interface IOrderRequestDTO {
    amount: number;
    phone: string;
    deliveryCode: string;
    selectedSizes: number[];
}

export enum OrderStatus {
    WAITING_FOR_PAYMENT, CANCELED, SUCCESSFULLY_PAID, PAYMENT_ERROR, PAYMENT_RETURNED,
    DELIVERING, DELIVERED
}

// WAITING_FOR_PAYMENT("Ожидание оплаты"),
//     CANCELED("Отменен"),
//     SUCCESSFULLY_PAID("Успешно оплачен"),
//     PAYMENT_ERROR("Ошибка при оплате"),
//     PAYMENT_RETURNED("Проведена операция возврата"),
//     DELIVERING("Доставляется"),
//     DELIVERED("Доставлен");

export interface IOrderResponseDTO {
    id: number;
    creationTime: Date;
    amount: number;
    orderStatus: OrderStatus;
    phone: string;
    selectedSizes: number[];
}

export interface IOrderRegisterResponse {
    orderId: string,
    formUrl: string
}