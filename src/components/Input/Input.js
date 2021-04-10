import React from "react";
import PropTypes from "prop-types";
import "./Input.scss";

import { ReactComponent as SearchIcon } from "../../assets/images/search_black.svg";

Input.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

function Input({ label, id, onChange, value, placeholder }) {
  return (
    <div className="Input">
      <label htmlFor={id} className="Input__label">
        {label}
      </label>
      <div className="Input__group">
        <input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="Input__field"
        />
        <button type="submit" title="Submit" className="Input__btn">
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}

export default Input;
