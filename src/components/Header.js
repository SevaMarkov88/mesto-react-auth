import logo from "../images/logo.svg";
import NavBar from "./NavBar";

function Header() {
  
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="logo header__logo" />
      <NavBar />
    </header>
  )
}

export default Header;
