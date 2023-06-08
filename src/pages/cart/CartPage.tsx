// noinspection JSUnresolvedLibraryURL, JSUnusedGlobalSymbols, HtmlUnknownTarget

import React, {useState} from 'react';

import {Link} from "react-router-dom";
import {useAppSelector} from "src/hooks/redux";
import {useCreateOrderMutation, useGetProductsQuery} from "src/store/api/spring.api";
import {motion} from "framer-motion";

import {ICartItem, IProduct, IProductSize, IOrderRegisterResponse, IOrderRequestDTO} from "src/types/interfaces";
import {Helmet} from "react-helmet";
import {useActions} from "src/hooks/actions";
import {displayPrice} from "src/utils/utilFunctions";
import InputMask from 'react-input-mask';

interface fieldState {
    value: string;
    valid: boolean;
}

function CartPage() {
    const cartItems: ICartItem[] = useAppSelector(state => state.cartStore.cart);
    const [createOrder] = useCreateOrderMutation();
    const {data: products} = useGetProductsQuery(null);
    const {incrementSize, decrementSize, deleteSize} = useActions();

    const [fullName, setFullName] = useState<fieldState>({value: "", valid: true});
    const [phone, setPhone] = useState<fieldState>({value: "", valid: true});
    const [email, setEmail] = useState<fieldState>({value: "", valid: true});
    const [pvz, setPvz] = useState<
        {id: string, address: string, valid: boolean}>(
        {id: "", address: "", valid: true});

    const calculateCart = (): IOrderRequestDTO => {
        const sizesList: number[] = [];
        let productsAmount = 0;
        if (products) {
            cartItems.forEach(item => {
                const product = products.find(product => item.productId === product.id) as IProduct;
                item.sizes.forEach(size => {
                    productsAmount += size.count * product.price;
                    sizesList.push(...Array(size.count).fill(size.id));
                })
            });
        }
        return {
            amount: productsAmount,
            phone: phone.value.replaceAll(' ', '').replaceAll('(', '').replaceAll(')', ''),
            deliveryCode: pvz.id, selectedSizes: sizesList
        };
    }

    const validateForm = (): boolean => {
        const fullNameValid = fullName.value.length > 0;
        setFullName({...fullName, ...{valid: fullNameValid}});

        const phoneValid = phone.value.length > 0 && !phone.value.includes("_");
        setPhone({...phone, ...{valid: phoneValid}});

        const emailValid = email.value.length > 0 && /^(.+)@(.+)$/.test(email.value);
        setEmail({...email, ...{valid: emailValid}});

        // const pvzId = (document.querySelector(".pay__pvz #pvz-id") as HTMLInputElement).value;
        const pvzValid = pvz.id.length > 0 && pvz.address.length > 0;
        setPvz({...pvz, ...{valid: pvzValid}});

        return fullNameValid && phoneValid && emailValid && pvzValid;
    }

    const checkoutHandler = async () => {
        if (validateForm()) {
            const response: IOrderRegisterResponse = await createOrder(calculateCart()).unwrap();
            window.location.href = response.formUrl;
        }
    }

    // noinspection JSUnresolvedReference
    return (
        <motion.main className="cartPage"
                     initial={{opacity: 0}}
                     animate={{opacity: 1}}
                     exit={{opacity: 0}}
        >
            <Helmet>
                <title>Корзина: нет товаров - AikiShoes</title>
                <meta name="description"
                      content="Корзина: все ваши выбранные товары готовы к оформлению."/>
                <link rel="canonical" href="https://aikishoes.ru/cart"/>
                <script type="text/javascript" src="https://points.boxberry.de/js/boxberry.js"/>
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
                                            const productSize = product.sizes.find(productSize => productSize.size === size.size) as IProductSize;

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
                                                if (size && productSize && size.count < Math.min(productSize.count, 5)) {
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
                        <section className="cartPage__pay pay">
                            <h2 className="pay__title">Оформление заказа</h2>

                            <input type="text" onChange={(event) => setFullName({
                                value: event.target.value.trim(),
                                valid: true
                            })}
                                   placeholder="ФИО (получатель товара)"
                                   className={`pay__input ${fullName.valid ? "" : "validateFailed"}`}/>
                            <InputMask
                                mask="(+7) 999 999 99 99"
                                onChange={(event) => setPhone({
                                    value: event.target.value.trim(),
                                    valid: true
                                })}
                                className={`pay__input ${phone.valid ? "" : "validateFailed"}`}
                                placeholder="Телефон"
                            />
                            <input type="email"
                                   onChange={(event) => setEmail({
                                       value: event.target.value.trim(),
                                       valid: true
                                   })}
                                   placeholder="Email"
                                   className={`pay__input ${email.valid ? "" : "validateFailed"}`}/>

                            <div className="pay__pvz" onClick={() => {
                                window.boxberry.open((result: IBoxberryResult): void => {
                                    setPvz({
                                        id: result.id,
                                        address: result.address,
                                        valid: true
                                    })
                                });
                            }}>
                                <input id="pvz-address" type="text" disabled={true}
                                       placeholder="Выбрать пункт выдачи"
                                       className={`pay__input ${pvz.valid ? "" : "validateFailed"}`}
                                       value={pvz.address}
                                />
                            </div>

                            <button className="pay__button black-button"
                                    onClick={checkoutHandler}>
                                Оформить заказ
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
