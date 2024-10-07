import { useNavigate } from "react-router-dom";
import "../css/list.css";

interface Item {
  mt20id: string;
  poster: string;
  prfnm: string;
  fcltynm: string;
  prfpdfrom: string;
  prfpdto: string;
}

export default function List({ item }: { item: Item }) {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/detail/${item.mt20id}`);
  };
  return (
    <li className="listComponent" onClick={goDetail}>
      <div>
        <img src={`http://www.kopis.or.kr${item.poster}`} alt="" />
      </div>
      <div>
        <p>{item.prfnm}</p>
        <p>
          {item.prfpdfrom} - {item.prfpdto}
        </p>
        <p>{item.fcltynm}</p>
      </div>
    </li>
  );
}
