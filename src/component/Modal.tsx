import { useEffect, useState } from "react";
import PickCard from "../component/PickCard";
import "../css/modal.css";
import Loading from "../component/Loading";

interface Item {
  mt20id: string;
  poster: string;
  prfnm: string;
  genrenm: string;
}

export default function Modal() {
  const [data, setData] = useState<Item[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [opacity, setOpacity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = `https://ruehan-kopis.org/popular-by-genre`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setData(data);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardSelect = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      if (selectedGenres.length < 3) {
        setSelectedGenres([...selectedGenres, genre]);
      }
    }
  };

  const handleSave = () => {
    if (selectedGenres.length === 3) {
      localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
      setOpacity(0);
    } else {
      alert("3개의 카드를 선택해주세요!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Modal_pick" style={{ opacity }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="pickBtn">
            <button onClick={() => window.history.back()}>🔙</button>
            <button
              onClick={() => {
                handleSave();
                window.location.reload();
              }}
            >
              🔜
            </button>
          </div>
          <h2>공연 pick 🍀</h2>
          <p className="h2_p">선호하는 공연 3개를 Pick 해주세요 👀</p>
          <ul>
            {data.map((item) => (
              <PickCard
                key={item.mt20id}
                item={item}
                onClick={() => handleCardSelect(item.genrenm)}
                selected={selectedGenres.includes(item.genrenm)}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
