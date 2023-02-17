import React from 'react';
import FeatureSlider from "./FeatureSlider";
import ProductCard from "./ProductCard";
import About from "./About";

import {useGetProductsQuery} from "src/store/api/spring.api";
import {motion} from "framer-motion";
import {Helmet} from "react-helmet";

function MainPage() {
    const {data: products} = useGetProductsQuery(null);

    return (
        <motion.main className="main"
                     initial={{opacity: 0}}
                     animate={{opacity: 1}}
                     exit={{opacity: 0}}
        >
            <Helmet>
                <title>AikiShoes - интернет-магазин качественной обуви</title>
                <meta name="description" content="Российский производитель обуви. Мы продаем настоящую обувь - носите, пока не надоест."/>
                <link rel="canonical" href="https://aikishoes.ru"/>
            </Helmet>

            <FeatureSlider className="main__featureSlider"/>

            <div className="container">
                <h1 className="main__title">Каталог</h1>
                <div className="main__products">
                    {products && products.map((product, i) => (
                        <ProductCard key={i} className="main__product" product={product}/>
                    ))}
                </div>
                <h2 className="main__title">Производство</h2>
                <About className="main__about"/>
            </div>
        </motion.main>
    )

}

export default MainPage;
