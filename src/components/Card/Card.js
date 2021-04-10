import React from "react";
import "./Card.scss";

import Badge from "../Badge/Badge";

function Card({ pokemon, isSelected, handlePokemonSelect }) {
  const handleClick = () => {
    handlePokemonSelect(pokemon);
  };

  return (
    <li className={`Card ${isSelected ? "Card--active" : null}`} onClick={handleClick}>
      <div className="Card__img-wrapper">
        <img src={pokemon.image} alt="Pokemon" className="Card__img" />
      </div>
      <div className="Card__content">
        <span className="Card__number">{`#${pokemon.id}`}</span>
        <h2 className="Card__name">{pokemon.name}</h2>
        <div className="Card__badges">
          {pokemon.types.map((t) => {
            return <Badge key={t} type={t} />;
          })}
        </div>
      </div>
    </li>
  );
}

export default Card;
