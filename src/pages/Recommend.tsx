import Card from "../component/Card";
import "../css/recommend.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import Modal from "../component/Modal";
import Loading from "../component/Loading";

interface Item {
  mt20id: string;
  poster: string;
  prfnm: string;
  fcltynm: string;
  prfpdfrom: string;
  prfpdto: string;
}

export default function Recommend() {
  const [data, setData] = useState<{ [key: string]: Item[] }>({});
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedGenres = localStorage.getItem("selectedGenres");
    if (storedGenres) {
      setGenres(JSON.parse(storedGenres));
    }
  }, []);

  const fetchData = async (genre: string) => {
    try {
      setLoading(true);
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}${month}${day}`;

      const url = `https://ruehan-kopis.org/performances?stdate=${formattedDate}&eddate=${formattedDate}&cpage=1&rows=10&shcate=${genre}`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  const fetchAllGenresData = async () => {
    const fetchedData = await Promise.all(
      genres.map(async (genre) => {
        const data = await fetchData(genre);
        return { genre, data };
      })
    );

    const genreDataMap: { [key: string]: Item[] } = {};
    fetchedData.forEach(({ genre, data }) => {
      genreDataMap[genre] = data || [];
    });

    setData(genreDataMap);
  };

  useEffect(() => {
    if (genres.length > 0) {
      fetchAllGenresData();
    }
  }, [genres]);

  return (
    <div className="Recommend mw">
      {loading ? (
        <Loading />
      ) : (
        <>
          {genres.length === 0 && <Modal />}
          <h2>추천 공연 리스트</h2>
          <p className="h2_p">맞춤형 공연 목록을 확인해보세요</p>
          {genres.map((genre) => (
            <section className="sec_rec" key={genre}>
              <h3>[{genre}] 과 유사한 공연</h3>
              <Swiper
                slidesPerView={5}
                spaceBetween={15}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {data[genre]?.map((item) => (
                  <SwiperSlide key={item.mt20id}>
                    <Card item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          ))}
        </>
      )}
    </div>
  );
}
