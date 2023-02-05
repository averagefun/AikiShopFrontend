import React from 'react';
import {useAppSelector} from "src/hooks/redux";
import {useGetProductsQuery} from "src/store/api/spring.api";

import {ICartItem} from "src/types/interfaces";

const readyToProduction = false;

function CartPage() {
    const cartItems: ICartItem[] = useAppSelector(state => state.cartStore.cart);
    const {data: products} = useGetProductsQuery(null);

    if (products && readyToProduction) {
        return (
            <main className="cartPage">
                <div className="container">
                    <div className="cartPage__wrapper">
                        {cartItems.map((item, i1) => {
                                const product = products.find(product => product.id === item.productId);
                                if (product) {
                                    return item.sizes.map((size, i2) => (
                                        <div key={i1*100 + i2} className="cartPage__item">
                                            <div className="cartPage__item-name">{product.name}</div>
                                            <div className="cartPage__item-img"><img src={
                                                [...product.images].sort(image => image.priority)[0].imagePath} alt=""/>
                                            </div>
                                            <div className="cartPage__item-price">{size.count} x {product.price}</div>
                                        </div>
                                    ))
                                } else {
                                    return (
                                        <div hidden={true} />
                                    )
                                }
                            }
                        )}
                    </div>
                </div>
            </main>
        )
    } else {
        return (
            <main className="cartPage"/>
        )
    }
}

export default CartPage;
