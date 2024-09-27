import "../css/card.css";

export default function PickCard() {
  return (
    <li className="card">
      <img src="/img/test.jpg" alt="" />
      <div className="contents">
        <p>[뮤지컬] 시카고</p>
        <p className="genre">뮤지컬</p>
      </div>
    </li>
  );
}
