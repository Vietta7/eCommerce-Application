import React, { useState } from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import './Slider.css';
import FancyboxWrapper from '../../utils/FancyboxWrapper';

interface Image {
  url: string;
  label?: string;
  dimensions: {
    w: number;
    h: number;
  };
}

interface SliderProd {
  images: Image[];
}

const Slider: React.FC<SliderProd> = ({ images }) => {
  const [thumbsSwiper, setThumbSwiper] = useState<SwiperCore>();

  return (
    <>
      <FancyboxWrapper
        options={{
          Carousel: {
            infinite: false,
          },
          dragToClose: false,
          contentClick: 'iterateZoom',
          Images: {
            Panzoom: {
              maxScale: 1.5,
            },
          },
          animated: true,
          Thumbs: false,
          Toolbar: {
            display: {
              left: [],
              middle: [],
              right: ['close'],
            },
          },
        }}
      >
        <Swiper
          className="product__slider"
          modules={[FreeMode, Navigation, Thumbs]}
          thumbs={{
            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          navigation
          centeredSlides={images.length > 1}
          spaceBetween={15}
          a11y={{
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} data-fancybox="gallery" data-src={image.url}>
              <img src={image.url} alt={image.label} />
            </SwiperSlide>
          ))}
        </Swiper>
      </FancyboxWrapper>

      <Swiper
        spaceBetween={20}
        slidesPerView={images.length > 1 ? 3 : 1}
        freeMode={images.length > 1}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs, Scrollbar]}
        className="product__thumb"
        onSwiper={setThumbSwiper}
        scrollbar={{
          hide: false,
          draggable: true,
          enabled: true,
          el: '.product__scrollbar',
        }}
        breakpoints={{
          320: {
            spaceBetween: 10,
            slidesPerView: images.length > 2 ? 'auto' : 1,
          },
          700: {
            spaceBetween: 15,
            slidesPerView: images.length > 2 ? 'auto' : 1,
          },
          920: {
            slidesPerView: images.length > 2 ? 'auto' : 1,
          },
          1024: {
            slidesPerView: images.length > 2 ? 'auto' : 1,
            spaceBetween: 15,
            freeMode: false,
          },
          1170: {
            slidesPerView: images.length > 2 ? 'auto' : 1,
          },
          1360: {
            slidesPerView: images.length > 2 ? 'auto' : 1,
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.url} alt={image.label} />
          </SwiperSlide>
        ))}
        <div className="product__wrapper">
          <div className="product__scrollbar swiper-scrollbar" />
        </div>
      </Swiper>
    </>
  );
};

export default Slider;
