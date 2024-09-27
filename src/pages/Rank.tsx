import Card from "../component/Card";
import List from "../component/List";
import "../css/rank.css";

export default function Rank() {
  return (
    <div className="rank mw">
      <h2>예매순위</h2>
      <p className="h2_p">‘전체’ 예매 순위를 확인해보세요</p>
      <nav>
        <button>전체</button>
        <button>연극</button>
        <button>뮤지컬</button>
        <button>클래식</button>
        <button>국악</button>
        <button>대중음악</button>
        <button>무용</button>
        <button>대중무용</button>
        <button>서커스/마술</button>
        <button>복합</button>
      </nav>
      <section className="sec1_rank">
        <ul>
          <Card />
          <Card />
          <Card />
        </ul>
      </section>
      <section className="sec2_rank">
        <ul>
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
          <List />
        </ul>
      </section>
    </div>
  );
}
