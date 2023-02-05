import React from 'react';
import FeatureSlider from "./FeatureSlider";
import ProductCard from "./ProductCard";
import About from "./About";
import {useGetProductsQuery} from "src/store/api/spring.api";

function MainPage() {
    const {data: products} = useGetProductsQuery(null);

    if (products) {
        return (
            <main className="main">
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
            </main>
        )
    } else {
        return (
            <main className="main" />
        )
    }
}

export default MainPage;
