import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper";

import {IFeatureSlide} from "src/types/interfaces";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const featureSlider: IFeatureSlide[] = [
    {
        alt: "Скидка на ботинки Aiki.",
        imagePath: require('../../assets/features/f1.jpg')
    },
    {
        alt: "Aiki Shoes гарантия качества.",
        imagePath: require('../../assets/features/f2.jpg')
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
