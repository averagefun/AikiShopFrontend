import React from 'react';

interface AboutProps {
    className: string;
}

function About(props: AboutProps) {
    return (
        <div className={`${props.className} about`}>
            <p className="about__paragraph">
                «Aiki» - российский бренд производства обуви. Мы уверены в своем качестве и подтверждаем это
                гарантией: в то время как средний гарантийный срок обуви составляет не более 90 дней, мы даем 1 год
                на выявление любых возможных дефектов ботинок.
            </p>
            <p className="about__paragraph">
                Секрет надежности и долговечности ботинок заключается в высококачественных
                идеально-подобранных компонентах, а также в процессе сборки ботинок. Используется натуральная кожа...
            </p>
        </div>
    );
}

export default About;