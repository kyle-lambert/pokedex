import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./Header.scss";
import PokemonLogo from "../../assets/images/PokemonLogo.svg";
import { BASE_URL } from "../../utils/constants";

import Input from "../Input/Input";

Header.propTypes = {
  findPokemon: PropTypes.func.isRequired,
  fetchPokemon: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

function Header({ findPokemon, fetchPokemon, loading }) {
  const [searchField, setSearchField] = React.useState("");
  const sourceRef = React.useRef(null);

  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (!e.target.value) {
      sourceRef.current = axios.CancelToken.source();
      fetchPokemon(BASE_URL, sourceRef.current.token);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sourceRef.current = axios.CancelToken.source();
    if (searchField && !loading) {
      findPokemon(searchField, sourceRef.current.token);
    }
  };

  React.useEffect(() => {
    return () => {
      if (sourceRef.current !== null) {
        sourceRef.current.cancel();
      }
    };
  }, []);

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
