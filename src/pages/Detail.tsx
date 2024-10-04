import { useEffect, useState } from "react";
import "../css/Detail.css";
import { useParams } from "react-router-dom";

interface PerformanceData {
  genrenm: string;
  prfnm: string;
  prfpdfrom: string;
  prfpdto: string;
  fcltynm: string;
  poster: string;
  prfage: string;
  prfruntime: string;
  prfcast: string;
  pcseguidance: string;
  dtguidance: string;
  styurls?: string;
}

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PerformanceData>();

  const fetchData = async () => {
    try {
      const url = `https://ruehan-kopis.org/performance/${id}`;
      const res = await fetch(url);
      const PerformanceData = await res.json();
      setData(PerformanceData);
      console.log(PerformanceData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail mw">
      <div className="title">
        <h2>
          [{data.genrenm}] {data.prfnm}
        </h2>
        <div className="date_hall">
          <p>
            {data.prfpdfrom} - {data.prfpdto}
          </p>
          <p>{data.fcltynm}</p>
        </div>
      </div>
      <section className="sec1">
        <div className="sideL">
          <img src={data.poster} alt={data.prfnm} />
        </div>
        <div className="sideR">
          <p>등급</p>
          <p>{data.prfage}</p>
          <p>관람시간</p>
          <p>{data.prfruntime}</p>
          <p>출연</p>
          <p>{data.prfcast}</p>
          <p>가격</p>
          <p>{data.pcseguidance}</p>
          <p>공연시간 안내</p>
          <p>{data.dtguidance}</p>
          <button className="book ">예매처 바로가기</button>
        </div>
      </section>
      <section className="sec2">
        {data.styurls &&
          data.styurls
            .split(",")
            .map((url, index) => <img key={index} src={url} alt={url} />)}
      </section>
      <section className="sec3">
        <h2>관람리뷰</h2>
        <button>리뷰 작성하기</button>
        <textarea
          name="review"
          id="review"
          placeholder="리뷰를 작성해주세요"
        ></textarea>
      </section>
    </div>
  );
}
