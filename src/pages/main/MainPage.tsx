import React from 'react';
import FeatureSlider from "./FeatureSlider";
import ProductCard from "./ProductCard";
import About from "./About";

import {useGetProductsQuery} from "src/store/api/spring.api";
import {motion} from "framer-motion";
import {Helmet} from "react-helmet";
import {isMobile} from 'react-device-detect';

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
                <meta name="description"
                      content="Надежность и комфорт, стиль и качество - это лучшие ботинки от российского производителя
                      крафтовой обуви Aiki Shoes. Мы не занимаемся штамповкой промышленных партий обуви. Каждый ботинок
                      изготовлен полностью ручным трудом с особым вниманием ко всем мелочам."/>
                <link rel="canonical" href="https://aikishoes.ru"/>
            </Helmet>

            {isMobile && (
                <FeatureSlider className="main__featureSlider" isMobile={true}/>
            )}

            <div className="container">
                <h1 className="main__title">Каталог</h1>
                <div className="main__products">
                    {products && products.map((product, i) => (
                        <ProductCard key={i} className="main__product" product={product}/>
                    ))}
                    {/*{!isMobile && (*/}
                    {/*    <FeatureSlider className="main__product product main__featureSlider" isMobile={false}/>*/}
                    {/*)}*/}
                </div>
                <About className="main__about"/>
            </div>
        </motion.main>
    )

}

export default MainPage;
