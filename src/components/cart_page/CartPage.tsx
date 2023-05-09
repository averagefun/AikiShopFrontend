import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useAppSelector} from "src/hooks/redux";
import {useCreateOrderMutation, useGetProductsQuery} from "src/store/api/spring.api";
import {motion} from "framer-motion";

import {ICartItem, IProduct, IProductSize, IOrderRegisterResponse, IOrderRest} from "src/types/interfaces";
import {Helmet} from "react-helmet";
import {useActions} from "src/hooks/actions";
import {displayPrice} from "src/utils/utilFunctions";

function CartPage() {
    const cartItems: ICartItem[] = useAppSelector(state => state.cartStore.cart);
    const [createOrder] = useCreateOrderMutation();
    const {data: products} = useGetProductsQuery(null);
    const {incrementSize, decrementSize, deleteSize} = useActions();

    const [payEmail, setPayEmail] = useState<string>();

    const calculateCart = (): IOrderRest => {
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
        return {amount: productsAmount, selectedSizes: sizesList, email: payEmail ? payEmail : ""};
    }

    const amountCart = calculateCart().amount;

    const checkoutHandler = async () => {
        const response: IOrderRegisterResponse = await createOrder(calculateCart()).unwrap();
        window.location.href = response.formUrl;
    }

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
                            <div className="pay__amount">Общая сумма: {displayPrice(amountCart)} ₽</div>
                            <div className="pay__delivery">
                                <p>Доставка по территории России осуществляется компанией СДЭК. Стоимость доставки
                                    зависит от расположения ближайшего к Вам пункта выдачи СДЭК
                                    и рассчитывается согласно тарифам транспортной компании. Позже здесь появится
                                    возможность выбрать на карте пункт выдачи, после чего автоматически
                                    рассчитается стоимость доставки.</p>
                            </div>
                            <input type="email" onChange={(event) => setPayEmail(event.target.value)}
                                   placeholder="Email" className="order-search__input"/>
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
