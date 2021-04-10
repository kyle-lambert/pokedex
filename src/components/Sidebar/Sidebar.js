import React from "react";
import "./Sidebar.scss";

import PokemonInfo from "../PokemonInfo/PokemonInfo";

function Sidebar({ pokemon }) {
  return <div className="Sidebar">{pokemon && <PokemonInfo pokemon={pokemon} />}</div>;
}

export default Sidebar;
