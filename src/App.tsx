import React from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import MainPage from "./components/main_page/MainPage";
import ProductPage from "./components/product_page/ProductPage";

import "./scss/style.scss"

function App() {
    const location = useLocation();

    return (
        <div className="wrapper">
            <Header/>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/product/:id" element={<ProductPage/>}/>
                </Routes>
            </AnimatePresence>
            <Footer/>
        </div>
    );
}

export default App;
