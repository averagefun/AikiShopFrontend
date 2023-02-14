import React from 'react';
import {IProduct, IProductImage} from "src/types/interfaces";
import {Link} from "react-router-dom";

interface ProductCardProps {
    className: string;
    product: IProduct;
}

function ProductCard(props: ProductCardProps) {
    const mainImage: IProductImage = [...props.product.images].sort(image => image.priority)[0];

    return (
        <Link to={`/product/${props.product.id}`} className={`${props.className} product`}>
            <div className="product__wrapper">
                <img className="product__image" src={mainImage.imagePath} alt={mainImage.alt}/>
                <div className="product__blackout"/>
                <div className="product__price black-price">
                    <span>{props.product.price} ₽</span>
                </div>
            </div>
            <button className="product__title">
                <span>{props.product.name}</span>
            </button>
        </Link>
    );
}

export default ProductCard;
