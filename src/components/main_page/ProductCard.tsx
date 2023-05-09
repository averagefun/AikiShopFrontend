import React from 'react';
import {IProduct, IProductImage} from "src/types/interfaces";
import {Link} from "react-router-dom";
import {displayPrice} from "src/utils/utilFunctions";

interface ProductCardProps {
    className: string;
    product: IProduct;
}

function ProductCard(props: ProductCardProps) {
    const mainImage: IProductImage = [...props.product.images].sort(
        (image1, image2) => image1.priority - image2.priority)[0];

    let discount = 0
    if (props.product.oldPrice) {
        discount = Math.round((props.product.price - props.product.oldPrice)/props.product.oldPrice * 100)
    }

    return (
        <Link to={`/product/${props.product.id}`} className={`${props.className} product`}>
            <div className="product__wrapper">
                <img className="product__image" src={mainImage.imagePath} alt={mainImage.alt}/>
                <div className="product__blackout"/>
                <div className="product__price black-price">
                    <div className="product__real-price">{displayPrice(props.product.price)} ₽</div>
                    {discount !== 0 && props.product.oldPrice && (
                        <div className="product__old-price">{discount}% <span className="price-cross">{displayPrice(props.product.oldPrice)} ₽</span></div>
                    )}
                </div>
            </div>
            <button className="product__title">
                <span>{props.product.name}</span>
            </button>
        </Link>
    );
}

export default ProductCard;
