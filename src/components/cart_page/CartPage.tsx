import React from 'react';
// import {useAppSelector} from "src/hooks/redux";
// import {useGetProductsQuery} from "src/store/api/spring.api";
import {motion} from "framer-motion";

// import {ICartItem} from "src/types/interfaces";
import {Helmet} from "react-helmet";

function CartPage() {
    // const cartItems: ICartItem[] = useAppSelector(state => state.cartStore.cart);
    // const {data: products} = useGetProductsQuery(null);

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
                <h1 className="orderStatusPage__title">Корзина</h1>
                <p className="orderStatusPage__content">Нет выбранных товаров.</p>
                {/*<div className="cartPage__wrapper">*/}
                {/*    {products && cartItems.map((item, i1) => {*/}
                {/*            const product = products.find(product => product.id === item.productId);*/}
                {/*            if (product) {*/}
                {/*                return item.sizes.map((size, i2) => (*/}
                {/*                    <div key={i1 * 100 + i2} className="cartPage__item">*/}
                {/*                        <div className="cartPage__item-name">{product.name}</div>*/}
                {/*                        <div className="cartPage__item-img"><img src={*/}
                {/*                            [...product.images].sort(image => image.priority)[0].imagePath} alt=""/>*/}
                {/*                        </div>*/}
                {/*                        <div className="cartPage__item-price">{size.count} x {product.price}</div>*/}
                {/*                    </div>*/}
                {/*                ))*/}
                {/*            } else {*/}
                {/*                return (*/}
                {/*                    <div hidden={true}/>*/}
                {/*                )*/}
                {/*            }*/}
                {/*        }*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </motion.main>
    )
}

export default CartPage;
