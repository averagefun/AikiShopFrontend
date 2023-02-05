import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";

import {IFeatureSlide} from "src/types/interfaces";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const featureSlider: IFeatureSlide[] = [
    {
        alt: "Современный стиль",
        imagePath: "https://img.freepik.com/premium-photo/new-collection-of-women-s-shoes-fall-winter-2022-the-girl-bought-new-shoes-legs-in-black-boots_173815-20133.jpg"
    },
    {
        alt: "Отвечаем за качество: 2 года гарантии",
        imagePath: "https://s1.1zoom.me/b5050/610/Alessandra_Blonde_girl_Sitting_Legs_Boots_Blouse_595791_3840x2400.jpg"
    },
    {
        alt: "Полностью произведено в России",
        imagePath: "https://img.freepik.com/premium-photo/new-collection-of-women-s-shoes-fall-winter-2022-the-girl-bought-new-shoes-legs-in-black-boots_173815-20133.jpg"
    }
]

interface FeatureSliderProps {
    className: string;
}

function FeatureSlider(props: FeatureSliderProps) {
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: true,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={{
                enabled: true,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className={`${props.className} featureSlider`}
        >
            {featureSlider.map((slide, i) => (
                <SwiperSlide key={i} className="featureSlider__slide"
                             style={{"background": "url('" + slide.imagePath + "')"}} />
            ))}
        </Swiper>
    )
}

export default FeatureSlider;

// resize window on chrome mobile

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
