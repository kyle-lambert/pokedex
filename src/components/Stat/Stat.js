import React from "react";
import PropTypes from "prop-types";
import "./Stat.scss";

Stat.propTypes = {
  stat: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
};

function Stat({ stat }) {
  const barProgressStyles = {
    transform: `scaleX(${stat.score / 100} )`,
  };
  return (
    <li className="Stat">
      <span className="Stat__name">{stat.name}</span>
      <span className="Stat__bar">
        <span className="Stat__bar-progress" style={barProgressStyles}></span>
      </span>
      <span className="Stat__score">{stat.score}</span>
    </li>
  );
}

export default Stat;
