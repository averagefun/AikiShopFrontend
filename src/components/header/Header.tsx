import React from 'react';
import {NavLink} from "react-router-dom";

function Header() {
    const iconMenuHandler = () => {
        const menuIcon = document.querySelector('.menu__icon');
        const headerLogo = document.querySelector('.header__logo');
        const menuBody = document.querySelector('.menu__body');
        const menuCart = document.querySelector('.menu__cart img') as HTMLImageElement;

        if (menuIcon) menuIcon.classList.toggle('_active');
        if (headerLogo) headerLogo.classList.toggle('_active');
        if (menuBody) menuBody.classList.toggle('_active');
        document.body.classList.toggle('_lock');

        if (menuCart && menuIcon && menuIcon.classList.contains('_active')) {
            if (menuCart.parentElement) {
                menuCart.parentElement.style.zIndex = "12";
            }
            setTimeout(() => {
                menuCart.src = require('../../assets/cart-white.png');
            }, 170)

        } else if (menuCart) {
            menuCart.src = require('../../assets/cart-black.png');
        }
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__row">
                    <div className="header__logo underline_anim">
                        <NavLink to="/">Aiki Shoes</NavLink>
                    </div>
                    <nav className="header__menu menu">

                        <div className="menu__body">
                            <ul className="menu__list">
                                <li className="menu__item underline_anim"><NavLink to="/">Каталог</NavLink></li>
                                <li className="menu__item underline_anim"><NavLink to="/contacts">Контакты</NavLink></li>
                                <li className="menu__item underline_anim"><NavLink to="/orderStatus">Статус заказа</NavLink></li>
                            </ul>
                        </div>
                        <NavLink className="menu__cart" to="/cart"><img src={require('../../assets/cart-black.png')} alt=""/></NavLink>
                        <div className="menu__icon" onClick={iconMenuHandler}>
                            <span/>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;
