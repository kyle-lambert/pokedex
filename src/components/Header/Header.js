import React from "react";
import "./Header.scss";
import PokemonLogo from "../../assets/images/PokemonLogo.svg";

function Header(props) {
  return (
    <header className="Header">
      <img src={PokemonLogo} alt="Pokemon Logo" className="Header__img" />
      <form className="Header__form">
        <div className="Header__input-group">
          <label htmlFor=""></label>
        </div>
        <input type="text" className="Header__input" placeholder="Search your Pokemon" />
      </form>
    </header>
  );
}

export default Header;
