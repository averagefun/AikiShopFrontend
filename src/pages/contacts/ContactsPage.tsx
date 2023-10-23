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

                <h2 className="contactsPage__title">Как мы производим обувь?</h2>
                <p className="about__paragraph">1. В первую очередь производится закупка натуральной качественной кожи.</p>
                <p className="about__paragraph">2. Следующим этапом кожа направляется в маленький город Вольск (Саратовская
                    область). Здесь из кожи шьют заготовки - внешняя часть шириной 1.6 - 1.8 мм и внутренняя подкладка
                    шириной 0.8 мм, качество готовой продукции проверяется вручную. Стоит отметить, что натуральная кожа
                    хорошо растягивается со временем, принимая форму вашей ноги, обеспечивая максимальное удобство при
                    ношении.</p>
                <p className="about__paragraph">3. В это же время подготавливается подошва. Из материала, который
                    используется при изготовлении качественной автомобильной резины (натуральный и синтетический каучук)
                    вырубаются основная подошва и каблук. Такая резина характеризуется хорошей цепкостью и мягкостью,
                    что прямо влияет на комфорт использования ботинок.</p>
                <p className="about__paragraph">4. Наконец, все компоненты соединяются воедино. К кожным заготовкам с
                    внутренней стороны на двухслойный клей приклеивается гарнитоль, обеспечивающая жесткость и форму
                    ботинок. Затем кожа приклеиваются к микропоре - прокладке шириной 10 мм между кожей и подошвой,
                    играющую роль утеплителя и демпфера. Кроме этого кожа пришивается к микропоре через кожный рант
                    по всему периметру, вы можете видеть толстую нитку вдоль всего ботинка - отрыв подошвы полностью
                    исключен. В результате получается соединение невероятной прочности и качества.
                    Завершающим этапом микропора приклеивается к подошве на хлоропреновый клей по той же технологии.</p>
                <p className="about__paragraph">5. В комплекте с ботинками идет стелька из натурального войлока,
                    которая обеспечивает дополнительный комфорт и поддержку для вашей стопы.</p>
                <p className="about__paragraph">Высокие и прочные, но легкие и удобные, ботинки Aiki
                    подойдут для любой погоды и любой поверхности.</p>

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
