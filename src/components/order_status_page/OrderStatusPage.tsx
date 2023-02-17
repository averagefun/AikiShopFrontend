import React from 'react';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";

function OrderStatusPage() {
    return (
        <main className="orderStatusPage">
            <Helmet>
                <title>Статус заказа - AikiShoes</title>
                <meta name="description"
                      content="Узнать статус вашего заказа."/>
                <link rel="canonical" href="https://aikishoes.ru/orderStatus"/>
            </Helmet>

            <div className="container">
                <h1 className="orderStatusPage__title">Статус заказа</h1>
                <p className="orderStatusPage__content">Кажется, у вас нет активных заказов на нашем сайте. Если это не
                    так, пожалуйста, обратитесь в поддержку.</p>
                <button className="orderStatusPage__help-button black-button"><Link to="/contacts">Решить проблему →</Link></button>
            </div>

        </main>
    );
}

export default OrderStatusPage;
