// noinspection JSUnresolvedLibraryURL, JSUnusedGlobalSymbols, HtmlUnknownTarget

import React, {useState} from 'react';

import {Link} from "react-router-dom";
import {useAppSelector} from "src/hooks/redux";
import {
    useCalculateOrderQuery,
    useCheckAuthQuery,
    useCreateOrderMutation,
    useGetProductsQuery
} from "src/store/api/spring.api";
import {motion} from "framer-motion";

import {
    AuthState,
    CartItem,
    Customer,
    OrderCalculateRequestDTO,
    OrderCreateResponseDTO,
    OrderRequestDTO,
    ProductSize,
    PromoStatus,
    StringFormFieldState,
} from "src/types/interfaces";
import {Helmet} from "react-helmet";
import {useActions} from "src/hooks/actions";
import {displayPrice} from "src/utils/functions";
import InputMask from 'react-input-mask';
import LoginModal from "src/components/modal/LoginModal";

function CartPage() {
    const {data: authState, refetch: updateAuth} = useCheckAuthQuery(null);
    const isAuthorized: boolean = authState ? authState.isAuthorized : false;
    const customer: Customer | null = isAuthorized ? (authState as AuthState).customer as Customer : null;

    const cartItems: CartItem[] = useAppSelector(state => state.cartStore.cart);
    const promo: string | undefined = useAppSelector(state => state.cartStore.promo);
    const [createOrder] = useCreateOrderMutation();
    const {data: products} = useGetProductsQuery(null);
    const {incrementSize, decrementSize, deleteSize, setPromo} = useActions();

    const [fullName, setFullName] = useState<StringFormFieldState>({value: "", valid: true});
    const [phone, setPhone] = useState<StringFormFieldState>({value: "", valid: true});
    const [pvz, setPvz] = useState<{ id: string, address: string, valid: boolean }>({id: "", address: "", valid: true});
    const [promoName, setPromoName] = useState<StringFormFieldState>({value: "", valid: true});
    const [oldCustomerId, setOldCustomerId] = useState<number>(0);
    const [allStateReady, setAllStateReady] = useState<boolean>(false);

    if (products && fullName && pvz && !allStateReady) {
        setAllStateReady(true);
    }

    const getCalculateRequest = (): OrderCalculateRequestDTO => {
        const sizesList: number[] = [];
        if (products) {
            cartItems.forEach(item => {
                item.sizes.forEach(size => {
                    sizesList.push(...Array(size.count).fill(size.id));
                })
            });
        }

        if (promo != undefined) {
            return {
                selectedSizes: sizesList,
                promoName: promo
            }
        }

        return {
            selectedSizes: sizesList
        };
    }

    const getOrder = (): OrderRequestDTO => {
        const sizesList: number[] = [];
        if (products) {
            cartItems.forEach(item => {
                item.sizes.forEach(size => {
                    sizesList.push(...Array(size.count).fill(size.id));
                })
            });
        }
        return {
            fullName: fullName.value.trim(),
            phone: phone.value.trim(),
            deliveryAddress: pvz.address.trim(),
            selectedSizes: sizesList,
            promoName: promoName.value.trim()
        };
    }

    const {data: calculatedOrder} = useCalculateOrderQuery(getCalculateRequest());

    if (customer && customer.id !== oldCustomerId) {
        setFullName({value: customer.defaultFullName ? customer.defaultFullName : "", valid: true});
        setPhone({value: customer.defaultPhone ? customer.defaultPhone : "", valid: true});
        setPvz({id: "", address: customer.defaultDeliveryAddress ? customer.defaultDeliveryAddress : "", valid: true});
        setOldCustomerId(customer.id);
    }

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const toggleModal = (state: boolean) => setIsModalOpen(state);

    const validateForm = (): boolean => {
        const fullNameValid = fullName.value.length > 0;
        setFullName({...fullName, ...{valid: fullNameValid}});

        const phoneValid = phone.value.length > 0 && !phone.value.includes("_");
        setPhone({...phone, ...{valid: phoneValid}});

        const pvzValid = pvz.address.length > 0;
        setPvz({...pvz, ...{valid: pvzValid}});

        return fullNameValid && phoneValid && pvzValid;
    }

    const [error, setError] = useState<string>();

    const checkoutHandler = () => {
        if (validateForm()) {
            createOrder(getOrder())
                .unwrap()
                .then((response: OrderCreateResponseDTO) => {
                    window.location.href = response.paymentUrl;
                })
                .catch((error) => setError(error.data.message));
        }
    }

    return (
        <motion.main className="cartPage"
                     initial={{opacity: 0}}
                     animate={{opacity: 1}}
                     exit={{opacity: 0}}
        >
            <Helmet>
                <title>Корзина - AikiShoes</title>
                <meta name="description"
                      content="Корзина: все ваши выбранные товары готовы к оформлению."/>
                <link rel="canonical" href="https://aikishoes.ru/cart"/>
                {/*<script type="text/javascript" src="https://points.boxberry.de/js/boxberry.js"/>*/}
            </Helmet>
            <div className="container">
                <h1 className="cartPage__title">Корзина</h1>
                {cartItems.length > 0 ? (
                    <div className="cartPage__wrapper">
                        <section className="cartPage__items">
                            {products && cartItems.map((item, i1) => {
                                    const product = products.find(product => product.id === item.productId);
                                    if (product) {
                                        return item.sizes.map((size, i2) => {
                                            const productSize = product.sizes.find(productSize => productSize.size === size.size) as ProductSize;

                                            const minusHandler = (): void => {
                                                if (size && size.count >= 1) {
                                                    decrementSize({
                                                        productId: product.id,
                                                        article: size.article,
                                                        sizeId: size.id,
                                                        size: size.size
                                                    });
                                                }
                                            }
                                            const plusHandler = (): void => {
                                                if (size && productSize && size.count < Math.min(productSize.count, 2)) {
                                                    incrementSize({
                                                        productId: product.id,
                                                        article: size.article,
                                                        sizeId: size.id,
                                                        size: size.size
                                                    });
                                                }
                                            }

                                            const deleteItemHandler = (): void => {
                                                if (size && size.count >= 1) {
                                                    deleteSize({
                                                        productId: product.id,
                                                        article: size.article,
                                                        sizeId: size.id,
                                                        size: size.size
                                                    });
                                                }
                                            }
                                            return (
                                                <div key={i1 * 100 + i2} className="cartPage__item">
                                                    <div className="cartPage__item-img">
                                                        <Link to={`/product/${product.id}?size=${size.size}`}><img src={
                                                            [...product.images].sort(image => image.priority)[0].imagePath}
                                                                                                                   alt=""/>
                                                        </Link>
                                                    </div>
                                                    <div className="cartPage__item-text">
                                                        <div className="cartPage__item-name"><Link
                                                            to={`/product/${product.id}?size=${size.size}`}>
                                                            {product.name}
                                                        </Link></div>
                                                        <div className="cartPage__item-size">Размер: {size.size}</div>
                                                        <div
                                                            className="cartPage__item-price">Итого: {displayPrice(size.count * product.price)} ₽
                                                        </div>
                                                        <div className="cartPage__item-counter counter">
                                                            <button className="counter__button" onClick={minusHandler}>
                                                                <svg className="minus" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9 4v1H0V4z"/>
                                                                </svg>
                                                            </button>
                                                            <input className="counter__input"
                                                                   readOnly={true}
                                                                   value={size.count}
                                                                   type="number" min="1"
                                                                   max="5"/>
                                                            <button className="counter__button" onClick={plusHandler}>
                                                                <svg className="plus" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9 4H5V0H4v4H0v1h4v4h1V5h4z"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <button className="cartPage__item-delete"
                                                                onClick={deleteItemHandler}>Удалить
                                                        </button>
                                                    </div>

                                                </div>
                                            );
                                        });
                                    } else {
                                        return (
                                            <div hidden={true}/>
                                        )
                                    }
                                }
                            )}
                        </section>
                        <section className="cartPage__checkout checkout">
                            <h2 className="checkout__title">Оформление заказа</h2>

                            <div className="pointer"
                                 onClick={() => toggleModal(true)}>
                                <input type="text"
                                       disabled={true}
                                       placeholder="Email"
                                       value={customer ? customer.email : ""}
                                       className={`checkout__input form-input fake-active-input ${isAuthorized && authState && authState.customer ? "" : "validateFailed"}`}
                                />
                            </div>
                            <LoginModal isOpen={isModalOpen} toggle={toggleModal} updateAuth={updateAuth}/>

                            <input type="text"
                                   disabled={!isAuthorized}
                                   value={fullName.value}
                                   onChange={(event) => setFullName({
                                       value: event.target.value,
                                       valid: true
                                   })}
                                   placeholder="ФИО (получатель товара)"
                                   className={`checkout__input form-input ${fullName.valid ? "" : "validateFailed"}`}/>
                            <InputMask
                                disabled={!isAuthorized}
                                value={phone.value}
                                mask="(+7) 999 999 99 99"
                                onChange={(event) => setPhone({
                                    value: event.target.value.trim().replaceAll(
                                        ' ', '').replaceAll(
                                        '(', '').replaceAll(
                                        ')', ''),
                                    valid: true
                                })}
                                className={`checkout__input form-input ${phone.valid ? "" : "validateFailed"}`}
                                placeholder="Телефон"
                            />
                            <input type="text"
                                   disabled={!isAuthorized}
                                   value={pvz.address}
                                   onChange={(event) => setPvz({
                                       id: "-1",
                                       address: event.target.value,
                                       valid: true
                                   })}
                                   placeholder="Адрес доставки"
                                   className={`checkout__input form-input ${pvz.valid ? "" : "validateFailed"}`}/>

                            <div className="checkout__input-btn-row">
                                <input type="text"
                                       disabled={!isAuthorized}
                                       value={promoName.value}
                                       onChange={(event) => setPromoName({
                                           value: event.target.value,
                                           valid: true
                                       })}
                                       placeholder="Промокод"
                                       className={`checkout__input form-input ${promoName.valid ? "" : "validateFailed"}`}/>
                                <button className="checkout__btn-row black-button"
                                        onClick={() => setPromo(promoName.value)}
                                        disabled={!promoName.valid}
                                >Применить</button>
                            </div>

                            {/*<div className={isAuthorized ? "pointer" : ""}*/}
                            {/*     onClick={() => {*/}
                            {/*         if (isAuthorized) {*/}
                            {/*             window.boxberry.open((result: BoxberryResult): void => {*/}
                            {/*                 setPvz({*/}
                            {/*                     id: result.id,*/}
                            {/*                     address: result.address,*/}
                            {/*                     valid: true*/}
                            {/*                 })*/}
                            {/*             });*/}
                            {/*         }*/}
                            {/*     }}>*/}
                            {/*    <input id="pvz-address" type="text"*/}
                            {/*           disabled={true}*/}
                            {/*           placeholder="Выбрать пункт выдачи"*/}
                            {/*           className={`checkout__input form-input ${pvz.valid ? "" : "validateFailed"} ${isAuthorized ? "fake-active-input" : ""}`}*/}
                            {/*           value={pvz.address}*/}
                            {/*    />*/}
                            {/*</div>*/}

                            {/*<p className="checkout__text">Пожалуйста, укажите полный адрес вашего дома.*/}
                            {/*    Мы выберем ближайший пункт выдачи заказа (СДЭК / Почта России) и отправим посылку туда.*/}
                            {/*    Информацию о доставке вы получите в виде смс/whatsapp/telegram, привязанных к вашему*/}
                            {/*    номеру телефона. Доставка уже включена в стоимость заказа.</p>*/}

                            {calculatedOrder && [PromoStatus.APPLIED, PromoStatus.APPLYING_ERROR].includes(calculatedOrder.promoStatus) && (
                                <div className={calculatedOrder.promoStatus === PromoStatus.APPLIED ? "checkout__price" : "checkout__error-message"}>{calculatedOrder.infoMessage}</div>
                            )}

                            {error && (
                                <div className="checkout__error-message">{error}</div>
                            )}

                            <button className="checkout__button black-button"
                                    onClick={checkoutHandler}>
                                Оформить заказ{calculatedOrder && (": " + displayPrice(calculatedOrder.finalAmount) +  "₽")}
                            </button>
                        </section>
                    </div>
                ) : (
                    <p className="cartPage__content">Нет выбранных товаров.</p>
                )}
            </div>
        </motion.main>
    )
}

export default CartPage;
