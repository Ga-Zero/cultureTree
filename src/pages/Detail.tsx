import { useCallback, useEffect, useState } from "react";
import "../css/Detail.css";
import { useParams } from "react-router-dom";
import Loading from "../component/Loading";

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
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const url = `https://ruehan-kopis.org/performance/${id}`;
      const res = await fetch(url);
      const performanceData = await res.json();
      setData(performanceData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail mw">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="title">
            <h2>
              [{data.genrenm}] {data.prfnm}
            </h2>
          </div>
          <section className="sec1">
            <div className="sideL">
              <img src={data.poster} alt={data.prfnm} />
            </div>
            <div className="sideR">
              <p className="SL">장소</p>
              <p>{data.fcltynm}</p>
              <p className="SL">공연기간</p>
              <p>
                {data.prfpdfrom} - {data.prfpdto}
              </p>
              <p className="SL">관람시간</p>
              <p>{data.prfruntime}</p>
              <p className="SL">출연</p>
              <p>{data.prfcast}</p>
              <p className="SL">가격</p>
              <p>{data.pcseguidance}</p>
              <p className="SL">공연시간 안내</p>
              <div className="times">
                {data.dtguidance.split("),").map((time, index) => (
                  <p key={index}>{time.trim() + ")"}</p>
                ))}
              </div>
              <button className="book ">예매처 바로가기</button>
            </div>
          </section>
          <section className="sec2">
            {data.styurls &&
              data.styurls
                .split(",")
                .map((url, index) => <img key={index} src={url} alt={url} />)}
          </section>
        </>
      )}
    </div>
  );
}
