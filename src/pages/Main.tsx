import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/main.css";
import Card from "../component/Card";
import { useEffect, useState } from "react";
import genresData from "../assets/genres.json";

interface Item {
  mt20id: string;
  poster: string;
  prfnm: string;
  fcltynm: string;
  prfpdfrom: string;
  prfpdto: string;
}

export default function Main() {
  const [data, setData] = useState<Item[]>([]);
  const [genre, setGenre] = useState<string>("");

  const fetchData = async () => {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}${month}${day}`;

      const genreParam = genre ? `&shcate=${genre}` : "";

      const url = `https://ruehan-kopis.org/performances?stdate=${formattedDate}&eddate=${formattedDate}&cpage=1&rows=10&shcate=${genreParam}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (err) {
      console.error();
    }
  };
  useEffect(() => {
    fetchData();
  }, [genre]);

  const handleGenreClick = (selectedGenre: string) => {
    setGenre(selectedGenre);
  };

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
          {data.slice(0, 3).map((item) => (
            <Card key={item.mt20id} item={item} />
          ))}
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
          {genresData.map((genre) => (
            <button key={genre.id} onClick={() => handleGenreClick(genre.id)}>
              {genre.name}
            </button>
          ))}
        </nav>
        <ul>
          {data.slice(0, 4).map((item, index) => (
            <li key={index}>
              <img src={item.poster} alt={item.prfnm} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
