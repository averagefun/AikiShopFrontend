import React from 'react';
import {Routes, Route} from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import MainPage from "./components/main_page/MainPage";
import ProductPage from "./components/product_page/ProductPage";
import ContactsPage from "./components/contacts_page/ContactsPage";
import OrderStatusPage from "./components/order_status_page/OrderStatusPage";
import CartPage from "./components/cart_page/CartPage";

import "./scss/style.scss"

function App() {
    return (
        <div className="wrapper">
            <Header/>
            <Routes>
                <Route path="/" element={<MainPage />}/>
                <Route path="/product/:id" element={<ProductPage />}/>
                <Route path="/contacts" element={<ContactsPage />}/>
                <Route path="/orderStatus" element={<OrderStatusPage />}/>
                <Route path="/cart" element={<CartPage />}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
