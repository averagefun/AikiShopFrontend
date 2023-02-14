import React from 'react';
import FeatureSlider from "./FeatureSlider";
import ProductCard from "./ProductCard";
import About from "./About";

import {useGetProductsQuery} from "src/store/api/spring.api";
import {motion} from "framer-motion";

function MainPage() {
    const {data: products} = useGetProductsQuery(null);

    if (products) {
        return (
            <motion.main className="main"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
            >
                <FeatureSlider className="main__featureSlider"/>

                <div className="container">
                    <h1 className="main__title">Каталог</h1>
                    <div className="main__products">
                        {products.map((product, i) => (
                            <ProductCard key={i} className="main__product" product={product}/>
                        ))}
                    </div>

                    <h2 className="main__title">Производство</h2>
                    <About className="main__about"/>
                </div>
            </motion.main>
        )
    } else {
        return (
            <main className="main" />
        )
    }
}

export default MainPage;
