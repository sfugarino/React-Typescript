import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "orange" };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="nav-item brand text-white">Best Parlors</div>
      <NavLink className="nav-item" activeStyle={activeStyle} exact to="/">
        Home
      </NavLink>
      <NavLink className="nav-item" activeStyle={activeStyle} to="/about">
        About
      </NavLink>
    </nav>
  );
};

export default Header;
