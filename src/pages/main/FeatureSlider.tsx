import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface FeatureSlide {
    alt: string;
    imagePath: string;
}

const featureSliderDesktop: FeatureSlide[] = [
    {
        alt: "Качественные ботинки Aiki из натуральной кожи со скидкой - весенняя распродажа",
        imagePath: require('../../assets/features/desktop/50_spring.jpg')
    },
    {
        alt: "Надежные и стильные Aiki Shoes, весенняя коллекция",
        imagePath: require('../../assets/features/desktop/37.jpg')
    },
    {
        alt: "Купить женские и мужские ботинки в интернет-магазине Aiki Shoes (Айки ботинки)",
        imagePath: require('../../assets/features/desktop/40.jpg')
    },
    {
        alt: "Весенняя распродажа! Огромные скидки при покупке ботинок Aiki в магазине Aiki Shoes",
        imagePath: require('../../assets/features/desktop/44.jpg')
    },
    {
        alt: "Только натуральная кожа - ботинки Aiki",
        imagePath: require('../../assets/features/desktop/31_spring.jpg')
    },
    {
        alt: "Ручная работа с особым вниманием ко всем деталям",
        imagePath: require('../../assets/features/desktop/35.jpg')
    }
]

const featureSliderMobile: FeatureSlide[] = [
    {
        alt: "Качественные ботинки Aiki из натуральной кожи со скидкой - весенняя распродажа",
        imagePath: require('../../assets/features/mobile/50_spring.jpg')
    },
    {
        alt: "Надежные и стильные Aiki Shoes Весна",
        imagePath: require('../../assets/features/mobile/37.jpg')
    },
    {
        alt: "Купить женские и мужские ботинки в интернет-магазине Aiki Shoes (Айки ботинки)",
        imagePath: require('../../assets/features/mobile/40.jpg')
    },
    {
        alt: "Огромные скидки на весенней распродаже при покупке ботинок Aiki в магазине Aiki Shoes",
        imagePath: require('../../assets/features/mobile/44.jpg')
    },
    {
        alt: "Только натуральная кожа - ботинки Aiki",
        imagePath: require('../../assets/features/mobile/31_spring.jpg')
    },
    {
        alt: "Ручная работа с особым вниманием ко всем деталям",
        imagePath: require('../../assets/features/mobile/47.jpg')
    },
    {
        alt: "Aiki Shoes - гарантия качества и комфорта",
        imagePath: require('../../assets/features/mobile/35.jpg')
    }
]

interface FeatureSliderProps {
    className: string;
    isMobile: boolean;
}

function FeatureSlider(props: FeatureSliderProps) {
    const featureSlider = props.isMobile ? featureSliderMobile : featureSliderDesktop;

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
                <SwiperSlide key={i} className="featureSlider__slide">
                    <img src={slide.imagePath} alt={slide.alt}/>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default FeatureSlider;

// resize window on chrome mobile

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
