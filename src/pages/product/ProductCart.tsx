import React, {useState} from 'react';
import {CartItem, ProductSize} from "src/types/interfaces";
import {useActions} from "src/hooks/actions";
import {useAppSelector} from "src/hooks/redux";
import {Link} from "react-router-dom";

interface ProductCartProps {
    className: string;
    productID: number;
    startSize?: string;
    productSizes: ProductSize[];
}

function ProductCart(props: ProductCartProps) {
    let defaultSize = props.productSizes[0];

    let foundSize = props.productSizes.find(size => size.size === (props.startSize ? props.startSize : "38") && size.count > 0);
    if (foundSize) {
        defaultSize = foundSize;
    } else {
        foundSize = props.productSizes.find(size => size.count > 0);
        if (foundSize) {
            defaultSize = foundSize;
        }
    }

    const [sizeActive, setSizeActive] = useState(defaultSize);

    const {addToCart, incrementSize, decrementSize} = useActions()
    const currItemCart = useAppSelector(state => state.cartStore.cart.find(product => product.productId === props.productID)) as CartItem;

    const minusHandler = (): void => {
        const currItemCartSize = currItemCart.sizes.find(size => size.size === sizeActive.size);
        if (currItemCartSize && currItemCartSize.count >= 1) {
            decrementSize({
                productId: props.productID,
                article: currItemCartSize.article,
                sizeId: currItemCartSize.id,
                size: currItemCartSize.size
            });
        }
    }

    const plusHandler = (): void => {
        const currItemCartSize = currItemCart.sizes.find(size => size.size === sizeActive.size);
        if (currItemCartSize && currItemCartSize.count < Math.min(sizeActive.count, 2)) {
            incrementSize({
                productId: props.productID,
                article: currItemCartSize.article,
                sizeId: currItemCartSize.id,
                size: currItemCartSize.size
            });
        }
    }

    return (
        <div className={`${props.className} product-cart`}>
            <div className="product-cart__size">
                <div className="product-cart__size-title">Размер:</div>
                <ul className="product-cart__size-list">
                    {[...props.productSizes]
                        .sort((size1, size2) => size1.size.localeCompare(size2.size))
                        .map((size, i) => (
                            <li key={i} className={
                                `product-cart__size-item 
                                        ${size.count > 0 ? "" : "crossed-circle"} 
                                        ${sizeActive.size === size.size && sizeActive.count > 0 ? "_active" : ""}
                                        `}
                                onClick={size.count > 0 ? () => {
                                    setSizeActive(props.productSizes.find(iterSize => iterSize.size === size.size) as ProductSize);
                                } : () => null}
                            >{size.size}</li>
                        ))}
                </ul>
            </div>
            <div className="product-cart__bottom">
                {(!currItemCart || !currItemCart.sizes.find(size => size.size === sizeActive.size)) ? (
                    <button className="product-cart__btn black-button"
                            disabled={!(sizeActive.count > 0)}
                            onClick={() => addToCart({
                                productId: props.productID,
                                article: sizeActive.article,
                                sizeId: sizeActive.id,
                                size: sizeActive.size
                            })}
                    >Добавить в корзину
                    </button>
                ) : (
                    <div className="product-cart__wrapper">
                        <div className="product-cart__counter counter">
                            <button className="counter__button" onClick={minusHandler}>
                                <svg className="minus" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 4v1H0V4z"/>
                                </svg>
                            </button>
                            <input className="counter__input"
                                   readOnly={true}
                                   value={(currItemCart.sizes.find(size => size.size === sizeActive.size) as ProductSize).count}
                                   type="number" min="1"
                                   max="5"/>
                            <button className="counter__button" onClick={plusHandler}>
                                <svg className="plus" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 4H5V0H4v4H0v1h4v4h1V5h4z"/>
                                </svg>
                            </button>
                        </div>
                        <Link to="/cart" className="product-cart__btn black-button">
                            Заказать →
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductCart;
