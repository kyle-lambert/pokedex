import React from "react";
import "./Header.scss";
import PokemonLogo from "../../assets/images/PokemonLogo.svg";

import Input from "../Input/Input";

function Header(props) {
  return (
    <header className="Header">
      <img src={PokemonLogo} alt="Pokemon Logo" className="Header__img" />
      <form className="Header__form">
        <Input label="Search" id="search" placeholder="Search Pokemon" />
      </form>
    </header>
  );
}

export default Header;
