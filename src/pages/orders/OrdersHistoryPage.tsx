import React, {useState} from 'react';
import {Helmet} from "react-helmet";
import {motion} from "framer-motion";
import {useCheckAuthQuery, useGetOrdersQuery, useGetProductsQuery} from "src/store/api/spring.api";
import {AuthState, Customer, FailedOrderStatuses, OrderSatusLabel, Product} from "src/types/interfaces";
import {displayPrice, formatDate} from "src/utils/functions";
import LoginModal from "src/components/modal/LoginModal";

function OrdersHistoryPage() {
    const {data: authState, refetch: updateAuth} = useCheckAuthQuery(null);
    const isAuthorized: boolean = authState ? authState.isAuthorized : false;
    const customer: Customer | null = isAuthorized ? (authState as AuthState).customer as Customer : null;

    const {data: ordersHistory} = useGetOrdersQuery(null, {skip: !isAuthorized});
    const isOrders = ordersHistory && ordersHistory.length > 0;
    const {data: products} = useGetProductsQuery(null, {skip: !isAuthorized});

    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const toggleModal = (state: boolean) => setModalOpen(state);

    return (
        <motion.main className="ordersHistoryPage"
                     initial={{opacity: 0}}
                     animate={{opacity: 1}}
                     exit={{opacity: 0}}>
            <Helmet>
                <title>Статус заказа - AikiShoes</title>
                <meta name="description"
                      content="Узнать статус вашего заказа."/>
                <link rel="canonical" href="https://aikishoes.ru/orderStatus"/>
            </Helmet>

            <LoginModal isOpen={isModalOpen} toggle={toggleModal} updateAuth={updateAuth} />

            {isAuthorized && customer ? (
                    <div className="container">
                        <h1 className="ordersHistoryPage__title">{isOrders ? "Ваши заказы" : "У Вас ещё нет заказов"}</h1>
                        <button
                            onClick={() => toggleModal(true)}
                            className="ordersHistoryPage__login-btn black-button"
                        >{customer.email}</button>
                        <div className="ordersHistoryPage__content">
                            {ordersHistory && ordersHistory.length > 0 && (
                                <section className="ordersHistoryPage__orders">
                                    {[...ordersHistory]
                                        .sort((order1, order2) => order2.id - order1.id)
                                        .map(order => {
                                            const isFailed = FailedOrderStatuses.includes(order.orderStatus);
                                            return (
                                                <div key={order.id}
                                                     className={`ordersHistoryPage__order order ${isFailed ? "order__failed" : ""}`}>
                                                    <div className="order__number">Заказ
                                                        №{`${order.id} от ${formatDate(order.creationTime)}`}</div>
                                                    <div
                                                        className="order__status">{OrderSatusLabel.get(order.orderStatus)}</div>
                                                    {products && (
                                                        <ul className="order__sizes">
                                                            {[...new Map(order.selectedSizes.map(size => [size.id, size])).values()]
                                                                .sort((size1, size2) => size2.id - size1.id)
                                                                .map(size => {
                                                                    const product = products.find(product => product.sizes.find(productSize => productSize.id == size.id)) as Product;
                                                                    console.log(order.selectedSizes);
                                                                    return (
                                                                        <li key={size.id} className="order__size">
                                                                            {`${product.name}, ${size.size} размер, 
                                                    ${order.selectedSizes.filter(currSize => currSize.id === size.id).length} шт, 
                                                    ${displayPrice(product.price)} ₽`}
                                                                        </li>
                                                                    )
                                                                })}
                                                        </ul>
                                                    )}
                                                    <div className="order__amount">Итого: {displayPrice(order.amount)} ₽
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </section>
                            )}
                        </div>

                    </div>
                ) :
                (
                    <div className="container">
                        <h1 className="ordersHistoryPage__title">Авторизуйтесь, чтобы просмотреть историю заказов</h1>
                        <button
                            onClick={() => toggleModal(true)}
                            className="ordersHistoryPage__login-btn black-button"
                        >Войти в аккаунт</button>
                    </div>
                )}

        </motion.main>
    );
}

export default OrdersHistoryPage;
