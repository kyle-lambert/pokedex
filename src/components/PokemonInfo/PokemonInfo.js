import React from "react";
import "./PokemonInfo.scss";

import Badge from "../Badge/Badge";
import Stat from "../Stat/Stat";

function PokemonInfo({ pokemon }) {
  return (
    <div className="PokemonInfo">
      <div className="PokemonInfo__img-wrapper">
        <img src={pokemon.image} alt="Pokemon" className="PokemonInfo__img" />
      </div>
      <div className="PokemonInfo__info">
        <span className="PokemonInfo__number">{`#${pokemon.id}`}</span>
        <h1 className="PokemonInfo__name">{pokemon.name}</h1>
        <div className="PokemonInfo__badges">
          {pokemon.types.map((t) => {
            return <Badge key={t} type={t} />;
          })}
        </div>
      </div>
      <ul className="PokemonInfo__stats">
        {pokemon.stats.map((s) => {
          return <Stat key={s.name} stat={s} />;
        })}
      </ul>
      <ul className="PokemonInfo__features">
        <li className="PokemonInfo__feature">
          <span className="PokemonInfo__key">Height</span>
          <span className="PokemonInfo__value">{`${pokemon.height}m`}</span>
        </li>
        <li className="PokemonInfo__feature">
          <span className="PokemonInfo__key">Weight</span>
          <span className="PokemonInfo__value">{`${pokemon.weight}kg`}</span>
        </li>
        <li className="PokemonInfo__feature">
          <span className="PokemonInfo__key">Abilities</span>
          <span className="PokemonInfo__value">
            {pokemon.abilities.map((a) => a[0].toUpperCase() + a.slice(1)).join(", ")}
          </span>
        </li>
        <li className="PokemonInfo__feature">
          <span className="PokemonInfo__key">Moves</span>
          <span className="PokemonInfo__value">{pokemon.moves}</span>
        </li>
      </ul>
    </div>
  );
}

export default PokemonInfo;
