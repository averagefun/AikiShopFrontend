import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

function Header() {
    const [mobileMenuActive, setMobileMenuActive] = useState(false);

    const displayMobileMenu = () => {
        const menuIcon = document.querySelector('.menu__icon');
        const headerLogo = document.querySelector('.header__logo');
        const menuBody = document.querySelector('.menu__body');
        const menuCart = document.querySelector('.menu__cart img') as HTMLImageElement;

        if (menuIcon) menuIcon.classList.toggle('_active');
        if (headerLogo) headerLogo.classList.toggle('_active');
        if (menuBody) menuBody.classList.toggle('_active');
        document.body.classList.toggle('_lock');

        if (menuCart && !mobileMenuActive) {
            if (menuCart.parentElement) {
                menuCart.parentElement.style.zIndex = "12";
            }
            setTimeout(() => {
                menuCart.src = require('../../assets/icons/cart-white.png');
            }, 170)

        } else if (menuCart) {
            menuCart.src = require('../../assets/icons/cart-black.png');
        }

        setMobileMenuActive(!mobileMenuActive);
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
                                <li className="menu__item underline_anim">
                                    <NavLink
                                        onClick={mobileMenuActive ? displayMobileMenu : void (0)} to="/">Каталог
                                    </NavLink>
                                </li>
                                <li className="menu__item underline_anim">
                                    <NavLink
                                        onClick={mobileMenuActive ? displayMobileMenu : void (0)}
                                        to="/">Контакты
                                    </NavLink>
                                </li>
                                <li className="menu__item underline_anim">
                                    <NavLink
                                        onClick={mobileMenuActive ? displayMobileMenu : void (0)} to="/">Статус
                                        заказа
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <NavLink onClick={mobileMenuActive ? displayMobileMenu : void (0)} className="menu__cart"
                                 to="/"><img src={require('../../assets/icons/cart-black.png')} alt=""/></NavLink>
                        <div className="menu__icon" onClick={displayMobileMenu}>
                            <span/>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;
