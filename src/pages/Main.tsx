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
import Loading from "../component/Loading";

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
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [upcomingData, setUpcomingData] = useState<Item[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}${month}${day}`;

      const genreParam = genre ? `&shcate=${genre}` : "";

      const url = `https://ruehan-kopis.org/performances?stdate=${formattedDate}&eddate=${formattedDate}&cpage=1&rows=10&shcate=${genreParam}`;
      const res = await fetch(url);

      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [genre]);

  const fetchUpcomingData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://ruehan-kopis.org/upcoming-performances");
      const data = await res.json();
      setUpcomingData(data);
    } catch (err) {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingData();
  }, []);

  const handleGenreClick = (selectedGenre: string) => {
    setSelectedGenre(selectedGenre);
    setGenre(selectedGenre);
  };
  return (
    <div className="main mw">
      {loading ? (
        <Loading />
      ) : (
        <>
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
              {upcomingData.slice(0, 2).map((item, index) => (
                <li key={index}>
                  <img src={item.poster} alt={item.prfnm} />
                </li>
              ))}
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
            <div>
              {genresData.map((genre) => (
                <button
                  key={genre.nameId}
                  onClick={() => handleGenreClick(genre.nameId)}
                  className={selectedGenre === genre.nameId ? "on" : ""}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <ul>
              {data.slice(0, 4).map((item, index) => (
                <li
                  key={index}
                  onClick={() =>
                    (window.location.href = `/detail/${item.mt20id}`)
                  }
                >
                  <img src={item.poster} alt={item.prfnm} />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
