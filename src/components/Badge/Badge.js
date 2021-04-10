import React from "react";
import "./Badge.scss";
import colors from "../../api/colors";

function Badge({ type }) {
  const badgeColor = colors[type];
  return (
    <span className="Badge" style={{ backgroundColor: badgeColor }}>
      {type}
    </span>
  );
}

export default Badge;
