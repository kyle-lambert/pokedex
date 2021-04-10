import React from "react";
import "./Error.scss";

function Error(props) {
  return (
    <div className="Error">
      <span className="Error__message">Sorry, there was a problem processing your request.</span>
    </div>
  );
}

export default Error;
