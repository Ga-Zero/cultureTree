import Logo from "../assets/logo.svg";
import "../css/footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <img src={Logo} alt="logo"></img>
      <p>© 2024 cultruetree. All rights reserved.</p>
    </div>
  );
}
