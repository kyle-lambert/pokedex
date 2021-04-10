import React from "react";

function Input({ label, id, ...rest }) {
  return (
    <div className="Input">
      <label htmlFor={id} className="Input__label">
        {label}
      </label>
      <input id={id} {...rest} className="Input__field" />
    </div>
  );
}

export default Input;
