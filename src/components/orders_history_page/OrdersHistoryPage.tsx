import React, {useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import {motion} from "framer-motion";
import {useGetOrderStatusQuery, useGetProductsQuery} from "src/store/api/spring.api";
import {useActions} from "src/hooks/actions";
import {useAppSelector} from "src/hooks/redux";
import {IOrder, IProduct, IProductSize} from "src/types/interfaces";
import {displayPrice, formatDate} from "src/utils/utilFunctions";

const getReadableOrderStatuses = (orderStatus: string): string => {
    switch (orderStatus) {
        case "waitingForPayment":
            return "Ожидание оплаты"
        case "paymentError":
            return "Ошибка при оплате"
        case "successfullyPaid":
            return "Успешно оплачен - готовим к отправке"
        default:
            return orderStatus;
    }
}

function OrdersHistoryPage() {
    const [searchParams] = useSearchParams();
    const newOrderId = searchParams.get("orderId") != null ? parseInt(searchParams.get("orderId") as string) : 0;
    const ordersHistory: IOrder[] = useAppSelector(state => state.ordersHistoryStore.ordersHistory);
    const isOrders = ordersHistory && ordersHistory.length > 0;
    const {data: products} = useGetProductsQuery(null);

    const {data: newOrder} = useGetOrderStatusQuery(newOrderId, {skip: newOrderId === 0});
    const {deleteCart, addOrder, removeOrder} = useActions();

    if (newOrder && !ordersHistory.find(order => order.id === newOrderId)) {
        addOrder(newOrder);
        if (newOrder.orderStatus === "successfullyPaid") {
            deleteCart();
        }
    }

    const [searchOrderId, setSearchOrderId] = useState<number>();
    const [searchEmail, setSearchEmail] = useState<string>();

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

            <div className="container">
                <h1 className="ordersHistoryPage__title">{isOrders ? "Ваши заказы:" : "Кажется, у вас нет заказов"}</h1>
                <div className="ordersHistoryPage__content">
                    {ordersHistory && ordersHistory.length > 0 && (
                        <section className="ordersHistoryPage__orders">
                            {[...ordersHistory]
                                .sort((order1, order2) => order2.id - order1.id)
                                .map(order => {
                                    const isFailed = order.orderStatus != "successfullyPaid";
                                    return (
                                        <div key={order.id}
                                             className={`ordersHistoryPage__order order ${isFailed ? "order__failed" : ""}`}>
                                            <div className="order__number">Заказ №{`${order.id} от ${formatDate(order.creationTime)}`}</div>
                                            <div
                                                className="order__status">{getReadableOrderStatuses(order.orderStatus)}</div>
                                            {products && (
                                                <ul className="order__sizes">
                                                    {Array.from(new Set<IProductSize>(order.selectedSizes))
                                                        .sort((size1, size2) => size2.id - size1.id)
                                                        .map(size => {
                                                            const product = products.find(product => product.sizes.find(productSize => productSize.id == size.id)) as IProduct;
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
                                            <div className="order__amount">Итого: {displayPrice(order.amount)} ₽</div>
                                            <button onClick={() => removeOrder(order)} className="order__hide"
                                                    hidden={!isFailed}>Скрыть
                                            </button>
                                        </div>
                                    );
                                })
                            }
                        </section>
                    )}
                    <section className="ordersHistoryPage__order-search order-search">
                        <h2 className="order-search__title">{isOrders ? "Заказ не отобразился в списке?" : "Если это не так, введите данные:"}</h2>
                        <input type="email" onChange={(event) => setSearchOrderId(parseInt(event.target.value))}
                               placeholder="Email" className="order-search__input"/>
                        <input min={1} type="number" onChange={(event) => setSearchEmail(event.target.value)}
                               placeholder="Номер заказа" className="order-search__input"/>
                        <button className="order-search__button black-button">Найти заказ</button>
                    </section>
                </div>
            </div>
        </motion.main>
    );
}

export default OrdersHistoryPage;
