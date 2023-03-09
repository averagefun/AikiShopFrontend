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
                    <p className="contactsPage__contact">Если у вас возникли любые вопросы по работе нашего магазина,
                        произошли проблемы при доставке товара, есть претензии по качеству обуви, пожалуйста,
                        обращайтесь к нам любым удобным Вам способом.</p>
                    <p className="contactsPage__contact">Нажмите на нужный контакт, чтобы автоматически перейти в
                        Telegram или Whatsapp.</p>
                    <p className="contactsPage__contact"><b>Telegram:</b> <a
                        href="https://t.me/aikishoes">@aikishoes</a>
                    </p>
                    <p className="contactsPage__contact"><b>WhatsApp:</b> <a
                        href="https://wa.me/message/MKM57MH4TGRII1">Aiki Shoes</a>
                    </p>
                    <p className="contactsPage__contact"><b>Телефон:</b> <a
                        href="tel:+79276986430">+7(927)-698-64-30</a></p>
                    <p className="contactsPage__contact"><b>Email:</b> <a
                        href="mailto:andrew.valid@ya.ru">andrew.valid@ya.ru</a></p>
                </section>
            </div>
        </main>
    );
}

export default ContactsPage;