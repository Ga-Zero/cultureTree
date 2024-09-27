import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/mainslide.css";
import Card from "../component/Card";
export default function Main() {
  return (
    <div className="main mw">
      <section className="sec1_main">
        <Swiper
          loop={true}
          effect={"fade"}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[EffectFade, Autoplay, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/img/boots.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/chicago.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/god.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/onerepulbic.webp" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/opera.webp" alt="" />
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="sec2_main">
        <h2>베스트공연</h2>
        <ul>
          <Card />
          <Card />
          <Card />
        </ul>
      </section>
      <section className="sec3_main">
        <h2>티켓 오픈</h2>
        <ul>
          <li>
            <img src="/img/test.jpg" alt="" />
          </li>
          <li>
            <img src="/img/test.jpg" alt="" />
          </li>
        </ul>
      </section>
      <section className="sec4_main">
        <Swiper
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/img/sec4_1.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/sec4_2.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/img/sec4_3.png" alt="" />
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="sec5_main">
        <h2>장르별 추천 공연</h2>
        <nav>
          <button>뮤지컬</button>
          <button>뮤지컬</button>
          <button>뮤지컬</button>
          <button>뮤지컬</button>
          <button>뮤지컬</button>
          <button>뮤지컬</button>
          <button>뮤지컬</button>
          <button>뮤지컬</button>
          <button>뮤지컬</button>
        </nav>
        <ul>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <li key={index}>
                <img src="/img/test.jpg" alt="" />
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
