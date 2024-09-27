import "../css/card.css";

export default function Card() {
  return (
    <li className="card">
      <img src="/img/test.jpg" alt="" />
      <div className="contents">
        <p>title</p>
        <p>place</p>
        <p>date</p>
      </div>
    </li>
  );
}
