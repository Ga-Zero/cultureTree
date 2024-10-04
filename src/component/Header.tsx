import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../css/header.css";
import { useState } from "react";
export default function Header() {
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header>
      <h1>
        <Link to="/">
          <img className="logo" src={Logo} alt="logo"></img>
        </Link>
      </h1>
      <div className="input-wrapper">
        <input
          type="text"
          placeholder="공연 제목을 입력해주세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
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
