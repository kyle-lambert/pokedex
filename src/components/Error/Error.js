import React from "react";
import "./Error.scss";

function Error({ message }) {
  return (
    <div className="Error">
      <span className="Error__message">{message}</span>
    </div>
  );
}

export default Error;
