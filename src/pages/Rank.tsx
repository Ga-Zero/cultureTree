import List from "../component/List";
import genresData from "../assets/genres.json";
import "../css/rank.css";
import { useEffect, useState } from "react";
import Loading from "../component/Loading";
import RankCard from "../component/RankCard";

interface Item {
  mt20id: string;
  poster: string;
  prfnm: string;
  fcltynm: string;
  prfpdfrom: string;
  prfpdto: string;
}

export default function Rank() {
  const [data, setData] = useState<Item[]>([]);
  const [genre, setGenre] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}${month}${day}`;

      const url = `https://ruehan-kopis.org/boxoffice?ststype=month&date=${formattedDate}&catecode=${genre}`;
      console.log(genre);

      const res = await fetch(url);
      const data = await res.json();
      console.log(url);
      console.log(data);
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

  const handleGenreClick = (selectedGenre: string) => {
    setGenre(selectedGenre);
  };

  return (
    <div className="rank mw">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>예매순위</h2>
          <p className="h2_p">‘전체’ 예매 순위를 확인해보세요</p>
          <div>
            {genresData.map((genre) => (
              <button key={genre.id} onClick={() => handleGenreClick(genre.id)}>
                {genre.name}
              </button>
            ))}
          </div>
          <section className="sec1_rank">
            <ul>
              {data.slice(0, 3).map((item) => (
                <RankCard key={item.mt20id} item={item} />
              ))}
            </ul>
          </section>
          <section className="sec2_rank">
            <ul>
              {data.slice(3, 10).map((item) => (
                <List key={item.mt20id} item={item} />
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
