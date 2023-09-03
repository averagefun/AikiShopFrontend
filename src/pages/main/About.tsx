import React from 'react';
import {Link} from "react-router-dom";

interface AboutProps {
    className: string;
}

function About(props: AboutProps) {
    return (
        <div className={`${props.className} about`}>
            <h2 className="main__title">Осенняя распродажа</h2>
            <p className="about__paragraph">
                Шагайте в эту осень с уверенностью и комфортом вместе с Aiki Shoes. Не упустите возможность обновить
                гардероб и добавить яркие акценты к вашему образу по хорошей скидке. Только до конца апреля!
                #осенняяраспродажа #скидки #попробуйчтотоновое
            </p>

            <h2 className="main__title">Почему Aiki?</h2>
            <p className="about__paragraph">
                Надежность, комфорт, стиль и качество - это лучшие ботинки от российского производителя обуви Aiki
                Shoes. Мы не занимаемся штамповкой промышленных партий обуви. Каждый ботинок изготовлен полностью ручным
                трудом с особым вниманием ко всем мелочам.
            </p>

            <p className="about__paragraph">
                <b><Link className="underline_anim" to="/contacts">Как мы производим обувь?</Link></b>
            </p>
        </div>
    );
}

export default About;