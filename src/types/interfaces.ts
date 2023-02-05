export interface IFeatureSlide {
    alt: string;
    imagePath: string;
}

export interface IProductSize {
    id?: number;
    size: string;
    count: number;
}

export interface IProductImage {
    id?: number;
    imagePath: string;
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
    id: number;
    size: string;
}
