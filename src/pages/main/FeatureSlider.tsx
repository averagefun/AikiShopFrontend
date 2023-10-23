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
        alt: "Качественные ботинки Aiki из натуральной кожи со скидкой - осенняя распродажа",
        imagePath: require('../../assets/features/desktop/50.jpg')
    },
    {
        alt: "Надежные и стильные Aiki Shoes, осенняя коллекция",
        imagePath: require('../../assets/features/desktop/37.jpg')
    },
    {
        alt: "Купить женские и мужские ботинки в интернет-магазине Aiki Shoes (Айки ботинки)",
        imagePath: require('../../assets/features/desktop/40.jpg')
    },
    {
        alt: "Осенняя распродажа! Огромные скидки при покупке ботинок Aiki в магазине Aiki Shoes",
        imagePath: require('../../assets/features/desktop/44.jpg')
    },
    {
        alt: "Только натуральная кожа - ботинки Aiki",
        imagePath: require('../../assets/features/desktop/31.jpg')
    },
    {
        alt: "Ручная работа с особым вниманием ко всем деталям",
        imagePath: require('../../assets/features/desktop/35.jpg')
    }
]

const featureSliderMobile: FeatureSlide[] = [
    {
        alt: "Качественные ботинки Aiki из натуральной кожи со скидкой - осенняя распродажа",
        imagePath: require('../../assets/features/mobile/50.jpg')
    },
    {
        alt: "Надежные и стильные Aiki Shoes Осень",
        imagePath: require('../../assets/features/mobile/37.jpg')
    },
    {
        alt: "Купить женские и мужские ботинки в интернет-магазине Aiki Shoes (Айки ботинки)",
        imagePath: require('../../assets/features/mobile/40.jpg')
    },
    {
        alt: "Огромные скидки на осенней распродаже при покупке ботинок Aiki в магазине Aiki Shoes",
        imagePath: require('../../assets/features/mobile/44.jpg')
    },
    {
        alt: "Только натуральная кожа - ботинки Aiki",
        imagePath: require('../../assets/features/mobile/31.jpg')
    },
    {
        alt: "Ручная работа с особым вниманием ко всем деталям",
        imagePath: require('../../assets/features/mobile/47.jpg')
    },
    {
        alt: "Aiki Shoes - гарантия качества и комфорта",
        imagePath: require('../../assets/features/mobile/35.jpg')
    },
    {
        alt: "Aiki Shoes - лучшая обувь для осени",
        imagePath: require('../../assets/features/mobile/70.jpg')
    },
    {
        alt: "Aiki Black - ботинки для стильных людей",
        imagePath: require('../../assets/features/mobile/72.jpg')
    },
    {
        alt: "Осенняя распродажа AikiShoes",
        imagePath: require('../../assets/features/mobile/73.jpg')
    },
    {
        alt: "Мужские ботинки Aiki Black из натуральной кожи",
        imagePath: require('../../assets/features/mobile/74.jpg')
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
