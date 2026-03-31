import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HeroStyle.css';
import banner1 from '../../assets/Quy_Nhap_Trang.png'
import banner2 from '../../assets/Tai.jpg'
import banner3 from '../../assets/D1NXM.jpg'
function Hero() {
  const banners = [
    { id: 1, img: banner1 },
    { id: 2, img: banner2 },
    { id: 3, img: banner3 },
  ];

  return (
    <div className="hero-carousel">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img src={banner.img} alt={`Banner ${banner.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Hero;