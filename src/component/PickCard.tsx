import "../css/card.css";
interface Item {
  mt20id: string;
  poster: string;
  prfnm: string;
  genrenm: string;
}
interface PickCardProps {
  item: Item;
  selected: boolean;
  onClick: () => void;
}

export default function PickCard({ item, selected, onClick }: PickCardProps) {
  return (
    <li className={`pick ${selected ? "selected" : ""}`} onClick={onClick}>
      <img src={item.poster} alt="" />
      <div className="contents">
        <p>{item.prfnm}</p>
        <p className="genre">{item.genrenm}</p>
      </div>
    </li>
  );
}
