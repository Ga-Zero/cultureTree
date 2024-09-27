import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../css/header.css";
export default function Header() {
  return (
    <header>
      <h1>
        <Link to="/">
          <img className="logo" src={Logo} alt="logo"></img>
        </Link>
      </h1>
      <div className="input-wrapper">
        <input type="text" placeholder="공연/정보를 입력해주세요" />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
      </div>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/recommend">추천</Link>
        <Link to="/rank">랭킹</Link>
        <Link to="/hall">주변 공연장</Link>
      </nav>
    </header>
  );
}
