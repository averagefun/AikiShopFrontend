import React from 'react';

import {IProductFeature, IProductImage, IProductSize} from "src/types/interfaces";
import ProductCart from "./ProductCart";

import {useGetProductQuery} from "src/store/api/spring.api";
import ProductImageSlider from "./ProductImageSlider";
import {useParams, useSearchParams} from "react-router-dom";
import {motion} from "framer-motion";
import {Helmet} from "react-helmet";
import ProductSizeChooser from "src/components/product_page/ProductSizeChooser";
import {displayPrice} from "src/utils/utilFunctions";

function ProductPage() {
    const {id} = useParams();
    const [searchParams] = useSearchParams();
    const startSize = searchParams.get("size") != null ? searchParams.get("size") as string : undefined;
    const {data: product} = useGetProductQuery(parseInt(id as string));

    if (product) {
        const images: IProductImage[] = product.images;
        const sizes: IProductSize[] = product.sizes;
        const features: IProductFeature[] = product.features;

        return (
            <motion.main className="productPage"
                         initial={{opacity: 0}}
                         animate={{opacity: 1}}
                         exit={{opacity: 0}}
            >
                <Helmet>
                    <title>{product.name} - купить в интернет-магазине AikiShoes</title>
                    <meta name="description" content="Качественные и надежные ботинки, выполненные из натуральной кожи с меховой стелькой,
                    подошва из каучука."/>
                    <link rel="canonical" href={`https://aikishoes.ru/product/${product.id}`}/>
                </Helmet>
                <div className="container">
                    <h1 className="productPage__title">{product.name}</h1>
                    <section className="productPage__content">
                        <ProductImageSlider className="productPage__imageSlider" images={images}/>

                        <div className="productPage__info productInfo">
                            <div className="productInfo__price ">
                                <div className="productInfo__real-price black-price">{displayPrice(product.price)} ₽</div>
                                <div className="productInfo__old-price price-cross">{product.oldPrice ? displayPrice(product.oldPrice) + " ₽": ""}</div>
                            </div>

                            <h2 className="productInfo__header">
                                Характеристики:
                            </h2>

                            <ul className="productInfo__features">
                                {[...features]
                                    .sort((feature1, feature2) =>
                                        feature1.priority - feature2.priority)
                                    .map((feature, i) => (
                                        <li key={i}>{feature.feature}</li>
                                    ))}
                            </ul>

                            <ProductCart className="productInfo__product-cart"
                                         productID={product.id}
                                         startSize={startSize}
                                         productSizes={sizes}/>
                        </div>
                    </section>
                    <ProductSizeChooser className="productPage__sizeChooser" />
                </div>
            </motion.main>
        );
    } else {
        return (
            <main className="productPage">
                <Helmet>
                    <title>Товар не найден - AikoShoes</title>
                    <meta name="description"
                          content="Данный товар не найден. Вы можете выбрать другой товар в каталоге."/>
                </Helmet>
            </main>
        );
    }
}

export default ProductPage;
