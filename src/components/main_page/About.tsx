import React from 'react';

interface AboutProps {
    className: string;
}

function About(props: AboutProps) {
    return (
        <div className={`${props.className} about`}>
            <p className="about__paragraph">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Animi consequatur iusto magni omnis quam soluta suscipit tempore.
                Aperiam aspernatur culpa ducimus ea illum necessitatibus officia placeat quia quod ullam.
                Corporis deserunt dolorum eligendi maiores officia recusandae similique? Accusamus corporis
                cupiditate doloremque.
            </p>
            <p className="about__paragraph">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Animi consequatur iusto magni omnis quam soluta suscipit tempore.
                Aperiam aspernatur culpa ducimus ea illum necessitatibus officia placeat quia quod ullam.
            </p>
        </div>
    );
}

export default About;