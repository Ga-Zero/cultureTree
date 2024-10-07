import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import areaData from "../assets/area.json";
import genresData from "../assets/genres.json";
import Card from "../component/Card";
import "../css/search.css";
import Calendars from "../component/Calendars";
import Loading from "../component/Loading";

interface Item {
  mt20id: string;
  poster: string;
  prfnm: string;
  fcltynm: string;
  prfpdfrom: string;
  prfpdto: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  const [data, setData] = useState<Item[]>([]);
  const [genre, setGenre] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [activeGenre, setActiveGenre] = useState<string>("");
  const [activeArea, setActiveArea] = useState<string>("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const formatDate = (date: Date) =>
        `${date.getFullYear()}${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}${String(date.getDate()).padStart(2, "0")}`;

      const formattedDate = selectedDate
        ? Array.isArray(selectedDate)
          ? selectedDate.map((date) => (date ? formatDate(date) : ""))
          : formatDate(selectedDate)
        : "";

      const genreParam = genre ? `&shcate=${genre}` : "";
      const areaParam = area ? `&signgucode=${area}` : "";

      const url = `https://ruehan-kopis.org/performances?stdate=${formattedDate}&eddate=${formattedDate}&cpage=1&rows=10&shcate=${genreParam}&signgucode=${areaParam}&shprfnm=${query}`;
      console.log(url);

      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (err) {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  const handleReset = () => {
    setGenre("");
    setArea("");
    setSelectedDate(new Date());
    console.log(setSelectedDate);

    setData([]);
  };

  const handleGenreClick = (genreId: string) => {
    setGenre(genreId);
    setActiveGenre(genreId);
  };

  const handleAreaClick = (areaName: string) => {
    setArea(areaName);
    setActiveArea(areaName);
  };

  useEffect(() => {
    fetchData();
  }, [genre, area, query, selectedDate]);

  return (
    <div className="search mw">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>'{query}' 검색결과</h2>
          <p className="h2_p">'{query}' 검색 결과를 확인해보세요</p>
          <div className="search_list">
            <section className="sec1_search">
              <div>
                <p>필터</p>
                <h3>장르</h3>
                <div className="div_button">
                  {genresData.map((genreItem, index) => (
                    <button
                      key={index}
                      onClick={() => handleGenreClick(genreItem.id)}
                      className={activeGenre === genreItem.id ? "on" : ""}
                    >
                      {genreItem.name}
                    </button>
                  ))}
                </div>
                <h3>날짜</h3>
                <div className="cal">
                  <Calendars onChange={(value) => setSelectedDate(value)} />
                </div>
                <h3>지역</h3>
                <div className="div_button">
                  {areaData.map((areaItem, index) => (
                    <button
                      key={index}
                      onClick={() => handleAreaClick(areaItem.name)}
                      className={activeArea === areaItem.name ? "on" : ""}
                    >
                      {areaItem.name}
                    </button>
                  ))}
                </div>
                <div className="search_buttons">
                  <button onClick={handleReset}>초기화</button>
                  <button onClick={handleSearch}>공연 검색</button>
                </div>
              </div>
            </section>
            <section className="sec2_search">
              <div>
                <ul>
                  {data.map((item) => (
                    <Card key={item.mt20id} item={item} />
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
