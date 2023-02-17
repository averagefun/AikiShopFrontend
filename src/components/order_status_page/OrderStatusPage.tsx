import React from 'react';
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

function OrderStatusPage() {
    return (
        <motion.main className="orderStatusPage"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}>
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
                <Link to="/contacts"><button className="orderStatusPage__help-button black-button">Обратиться в поддержку →</button></Link>
            </div>
        </motion.main>
    );
}

export default OrderStatusPage;
