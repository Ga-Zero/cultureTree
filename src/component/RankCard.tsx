import { useNavigate } from "react-router-dom";
import "../css/card.css";

interface Item {
  mt20id: string;
  poster: string;
  prfnm: string;
  fcltynm: string;
  prfpdfrom: string;
  prfpdto: string;
}

export default function RankCard({ item }: { item: Item }) {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/detail/${item.mt20id}`);
  };
  return (
    <li className="card" onClick={goDetail}>
      <img src={`http://www.kopis.or.kr${item.poster}`} alt="" />
      <div className="contents">
        <p>{item.prfnm}</p>
        <p>{item.fcltynm}</p>
        <p>
          {item.prfpdfrom} - {item.prfpdto}
        </p>
      </div>
    </li>
  );
}
