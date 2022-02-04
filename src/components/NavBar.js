import React from "react";
import { NavLink } from 'react-router-dom';

function NavBar() {
    return (
      <nav className="menu">
        {/* <NavLink
          exact
          className="menu__item"
          activeClassName="menu__item_active"
          to="/sing-in"
        >
          Вход
        </NavLink> */}
        <NavLink
          className="menu__item"
          activeClassName="menu__item_active"
          to="/sing-up"
        >
          Регистрация
        </NavLink>
      </nav>
    );
}

export default NavBar;