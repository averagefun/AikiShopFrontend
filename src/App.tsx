import React from 'react';
import {Routes, Route, useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "src/components/header/Header";
import Footer from "src/components/footer/Footer";
import ScrollToTop from "./utils/ScrollToTop";

import MainPage from "./pages/main/MainPage"
import ProductPage from "./pages/product/ProductPage";
import ContactsPage from "./pages/contacts/ContactsPage";
import OrdersHistoryPage from "./pages/orders/OrdersHistoryPage";
import CartPage from "./pages/cart/CartPage";

import "./scss/style.scss"

function App() {
    const location = useLocation();

    return (
        <div className="wrapper">
            <Header/>
            <AnimatePresence mode="wait">
                <ScrollToTop />
                <Routes location={location} key={location.pathname}>
                    <Route path="/product/:id" element={<ProductPage />}/>
                    <Route path="/contacts" element={<ContactsPage />}/>
                    <Route path="/orderStatus" element={<OrdersHistoryPage />}/>
                    <Route path="/cart" element={<CartPage />}/>
                    <Route path="*" element={<MainPage />}/>
                </Routes>
            </AnimatePresence>
            <Footer/>
        </div>
    );
}

export default App;
