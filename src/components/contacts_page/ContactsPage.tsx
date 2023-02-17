import React from 'react';
import {Helmet} from "react-helmet";

function ContactsPage() {
    return (
        <main className="contactsPage">
            <Helmet>
                <title>Контакты - AikiShoes</title>
                <meta name="description"
                      content="Телефон, мессенджеры, email - все способы связи с администрацией."/>
                <link rel="canonical" href="https://aikishoes.ru/contacts"/>
            </Helmet>

            <div className="container">
                <h1 className="contactsPage__title">Контакты</h1>
                <section className="contactsPage__body">
                    <p className="contactsPage__contact">Telegram: <a href="https://t.me/worldbelike">@worldbelike</a></p>
                    <p className="contactsPage__contact">Телефон: <a href="tel:+79934812060">+7 (993) 481 20 60</a></p>
                    <p className="contactsPage__contact">Email: <a href="mailto:andrew.valid@ya.ru">andrew.valid@ya.ru</a></p>
                </section>
            </div>
        </main>
    );
}

export default ContactsPage;