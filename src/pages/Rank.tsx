import List from "../component/List";
import genresData from "../assets/genres.json";
import "../css/rank.css";
import { useCallback, useEffect, useState } from "react";
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
  const [genre, setGenre] = useState<{ id: string; name: string }>({
    id: "",
    name: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const formattedDate = `${year}${month}${day}`;

      const url = `https://ruehan-kopis.org/boxoffice?ststype=month&date=${formattedDate}&catecode=${genre.id}`;

      const res = await fetch(url);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error();
    } finally {
      setLoading(false);
    }
  }, [genre]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleGenreClick = (selectedGenre: { id: string; name: string }) => {
    setGenre(selectedGenre);
  };

  return (
    <div className="rank mw">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2>예매순위</h2>
          <p className="h2_p">{genre.name} 예매 순위를 확인해보세요</p>
          <div>
            {genresData.map((genreItem) => (
              <button
                key={genreItem.id}
                onClick={() =>
                  handleGenreClick({ id: genreItem.id, name: genreItem.name })
                }
                className={genre.id === genreItem.id ? "on" : ""}
              >
                {genreItem.name}
              </button>
            ))}
          </div>

          <section className="sec1_rank">
            {data.length === 0 ? (
              <p className="blank">다른 랭킹을 확인해주세요</p>
            ) : (
              <ul>
                {data.slice(0, 3).map((item) => (
                  <RankCard key={item.mt20id} item={item} />
                ))}
              </ul>
            )}
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
