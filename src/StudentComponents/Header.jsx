import React from "react";
import header from "./HeaderComponents/Header.module.css";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import HeaderNav from "./HeaderComponents/HeaderNav";

function Header() {
  return (
    <div className={header.header}>
      <img src={logo} alt="logo" className={header.logo} />
      <HeaderNav />
    </div>
  );
}

export default Header;
