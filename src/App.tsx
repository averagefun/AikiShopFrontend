import React from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";

import MainPage from "./components/main_page/MainPage";
import ProductPage from "./components/product_page/ProductPage";
import ContactsPage from "src/components/contacts_page/ContactsPage";
import OrderStatusPage from "src/components/order_status_page/OrderStatusPage";
import CartPage from "src/components/cart_page/CartPage";

import "./scss/style.scss"

function App() {
    const location = useLocation();

    return (
        <div className="wrapper">
            <Header/>
            <AnimatePresence mode="wait">
                <ScrollToTop />
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<MainPage />}/>
                    <Route path="/product/:id" element={<ProductPage />}/>
                    <Route path="/contacts" element={<ContactsPage />}/>
                    <Route path="/orderStatus" element={<OrderStatusPage />}/>
                    <Route path="/cart" element={<CartPage />}/>
                    <Route path="*" element={<MainPage />}/>
                </Routes>
            </AnimatePresence>
            <Footer/>
        </div>
    );
}

export default App;
