import Card from "../component/Card";
import "../css/recommend.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
export default function Recommend() {
  return (
    <div className="Recommend mw">
      <h2>추천 공연 리스트</h2>
      <p className="h2_p">맞춤형 공연 목록을 확인해보세요</p>
      <section className="sec_rec">
        <h3>뮤지컬 영웅과 유사한 공연</h3>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
          <SwiperSlide>
            <Card />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
}
