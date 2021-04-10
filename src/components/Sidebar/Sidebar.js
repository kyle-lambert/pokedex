import React from "react";
import PropTypes from "prop-types";
import "./Sidebar.scss";

import PokemonInfo from "../PokemonInfo/PokemonInfo";

Sidebar.propTypes = {
  pokemon: PropTypes.shape({
    image: PropTypes.string.isRequired,
    defaultImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    types: PropTypes.array.isRequired,
    moves: PropTypes.number.isRequired,
    abilities: PropTypes.array.isRequired,
  }),
};

function Sidebar({ pokemon }) {
  return <div className="Sidebar">{pokemon && <PokemonInfo pokemon={pokemon} />}</div>;
}

export default Sidebar;
