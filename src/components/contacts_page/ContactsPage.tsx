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
                    <p className="contactsPage__contact"><b>Вконтакте:</b> <a
                        href="https://vk.com/aikishoes">aikishoes</a>
                    </p>
                    <p className="contactsPage__contact"><b>Email:</b> <a
                        href="mailto:aikishoes@yandex.ru">aikishoes@yandex.ru</a></p>
                </section>

                <h2 className="contactsPage__title">Реквизиты</h2>
                <section className="contactsPage__body">
                    <p className="contactsPage__contact">ИП Барабанщиков Андрей Дмитриевич</p>
                    <p className="contactsPage__contact">ИНН: 637603261586</p>
                    <p className="contactsPage__contact">ОГРНИП: 323631200046885</p>
                    <p className="contactsPage__contact">Адрес: г. Санкт-Петербург, ул. Печатника Григорьева, 8</p>
                </section>
            </div>
        </main>
    );
}

export default ContactsPage;