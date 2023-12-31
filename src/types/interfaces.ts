// ** PRODUCTS **

export interface ProductSize {
    id: number;
    article: string;
    size: string;
    count: number;
}

export interface ProductImage {
    id?: number;
    imagePath: string;
    alt: string;
    priority: number;
}

export interface ProductFeature {
    id?: number;
    feature: string;
    priority: number;
}

export interface Product {
    id: number;
    name: string;
    oldPrice?: number;
    price: number;
    sizes: ProductSize[];
    images: ProductImage[];
    features: ProductFeature[];
}

export interface CartItem {
    productId: number;
    sizes: ProductSize[];
}

// ** AUTH **
export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    email: string;
}

export interface AuthState {
    isAuthorized: boolean;
    customer: Customer | null;
}

// ** CUSTOMER **
export interface Customer {
    id: number;
    email: string;
    defaultFullName: string | null;
    defaultPhone: string | null;
    defaultDeliveryAddress: string | null;
}

export interface LoginResponse {
    jwtToken: string;
}

// ** ORDERS **

export interface OrderCalculateResponseDTO {
    defaultAmount: number;
    promoStatus: string;
    infoMessage: string;
    finalAmount: number;
}

export enum PromoStatus {
    NOT_SPECIFIED, APPLYING_ERROR, APPLIED
}

export interface OrderCalculateRequestDTO {
    selectedSizes: number[];
    promoName?: string;
}

export interface OrderCalculateResponse {
    defaultAmount: number;
    promoStatus: PromoStatus;
    infoMessage: string;
    finalAmount: number;
}

export interface OrderRequestDTO {
    fullName: string;
    phone: string;
    deliveryAddress: string;
    selectedSizes: number[];
    promoName: string;
}

export interface OrderResponseDTO {
    id: number;
    paymentUrl?: string;
    creationTime: number[];
    amount: number;
    orderStatus: string;
    phone: string;
    selectedSizes: ProductSize[];
}

export enum OrderStatus {
    WAITING_FOR_PAYMENT, CANCELED, SUCCESSFULLY_PAID, PAYMENT_ERROR, PAYMENT_RETURNED,
    DELIVERING, DELIVERED
}

export const FailedOrderStatuses = [OrderStatus.CANCELED, OrderStatus.PAYMENT_ERROR, OrderStatus.PAYMENT_RETURNED];

export const OrderSatusLabel = new Map<number, string>([
    [OrderStatus.WAITING_FOR_PAYMENT, "Ожидание оплаты - нажмите, чтобы оплатить"],
    [OrderStatus.CANCELED, 'Отменен'],
    [OrderStatus.SUCCESSFULLY_PAID, 'Успешно оплачен - готовим к отправке'],
    [OrderStatus.PAYMENT_ERROR, 'Ошибка при оплате заказа'],
    [OrderStatus.PAYMENT_RETURNED, 'Возврат товара'],
    [OrderStatus.DELIVERING, 'Уже в пути'],
    [OrderStatus.DELIVERED, 'Успешно доставлен'],
]);

export interface Order {
    id: number;
    paymentUrl?: string;
    creationTime: Date;
    amount: number;
    orderStatus: OrderStatus;
    phone: string;
    selectedSizes: ProductSize[];
}

export interface OrderCreateResponseDTO {
    paymentId: string;
    paymentUrl: string;
}

// ** FORMS **
export interface StringFormFieldState {
    value: string;
    valid: boolean;
}

// ** OTHER **
export interface MessageDTO {
    message: string;
}
