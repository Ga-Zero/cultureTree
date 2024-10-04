import "../css/list.css";

export default function List() {
  return (
    <li className="listComponent">
      <div>
        <img src="/img/test.jpg" alt="" />
        <p>title</p>
      </div>
      <div>
        <p>date</p>
        <p>place</p>
      </div>
    </li>
  );
}
