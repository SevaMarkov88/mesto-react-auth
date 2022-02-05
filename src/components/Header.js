import logo from "../images/logo.svg";
import NavBar from "./NavBar";

function Header(props) {
  
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="logo header__logo" />
      <NavBar
        loggedIn={props.loggedIn}
        logOpen={props.logOpen}
        regOpen={props.regOpen}
      />
    </header>
  )
}

export default Header;
