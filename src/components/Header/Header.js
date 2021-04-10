import React from "react";
import "./Header.scss";
import PokemonLogo from "../../assets/images/PokemonLogo.svg";
import { BASE_URL } from "../../utils/constants";

import Input from "../Input/Input";

function Header({ findPokemon, fetchPokemon }) {
  const [searchField, setSearchField] = React.useState("");

  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (!e.target.value) {
      fetchPokemon(BASE_URL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchField) {
      console.log("submit");
      findPokemon(searchField);
    }
  };
  return (
    <header className="Header">
      <img src={PokemonLogo} alt="Pokemon Logo" className="Header__img" />
      <form onSubmit={handleSubmit} className="Header__form">
        <Input
          label="Search"
          value={searchField}
          onChange={handleChange}
          id="search"
          placeholder="Search Pokemon"
        />
      </form>
    </header>
  );
}

export default Header;
