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

export default function Card({ item }: { item: Item }) {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/detail/${item.mt20id}`);
  };
  return (
    <li className="card" onClick={goDetail}>
      <img src={item.poster} alt="" />
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
