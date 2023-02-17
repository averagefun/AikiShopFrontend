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
        </main>
    );
}

export default ContactsPage;