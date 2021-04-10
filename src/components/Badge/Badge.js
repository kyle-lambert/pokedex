import React from "react";
import PropTypes from "prop-types";
import "./Badge.scss";
import colors from "../../api/colors";

Badge.propTypes = {
  type: PropTypes.string.isRequired,
};

function Badge({ type }) {
  const badgeColor = colors[type];
  return (
    <span className="Badge" style={{ backgroundColor: badgeColor }}>
      {type}
    </span>
  );
}

export default Badge;
