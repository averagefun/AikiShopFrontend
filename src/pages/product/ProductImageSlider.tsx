import React, {useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation, Thumbs} from "swiper";
import {ProductImage} from "src/types/interfaces";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductImageSliderProps {
    className: string;
    images: ProductImage[];
}

function ProductImageSlider(props: ProductImageSliderProps) {

    const initialState: any = null;
    const [thumbsSwiper, setThumbsSwiper] = useState(initialState);

    return (
        <div className={`${props.className} imageSlider`}>
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{swiper: thumbsSwiper}}
                modules={[FreeMode, Navigation, Thumbs]}
                className="imageSlider__swiper-main"
            >
                {[...props.images].sort((image1, image2) => image1.priority - image2.priority).map((image, i) => (
                    <SwiperSlide key={i}>
                        <img src={image.imagePath} alt={image.alt}/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="imageSlider__swiper-thumbs"
            >
                {[...props.images].sort((image1, image2) => image1.priority - image2.priority).map((image, i) => (
                    <SwiperSlide key={i}>
                        <img src={image.imagePath} alt={image.alt}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProductImageSlider;
