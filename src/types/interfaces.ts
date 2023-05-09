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
    amount: number;
    creationTime: Date;
    orderStatus: string;
    selectedSizes: IProductSize[];
    // deliveryCode: string;
    // email: string;
}

export interface IOrderRest {
    amount: number;
    selectedSizes: number[];
    email: string;
}

export interface IOrderRegisterResponse {
    orderId: string,
    formUrl: string
}