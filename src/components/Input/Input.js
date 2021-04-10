import React from "react";
import "./Input.scss";

import { ReactComponent as SearchIcon } from "../../assets/images/search_black.svg";

function Input({ label, id, ...rest }) {
  return (
    <div className="Input">
      <label htmlFor={id} className="Input__label">
        {label}
      </label>
      <div className="Input__group">
        <input id={id} {...rest} className="Input__field" />
        <div className="Input__icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default Input;
