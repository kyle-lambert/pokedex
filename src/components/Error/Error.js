import React from "react";
import PropTypes from "prop-types";
import "./Error.scss";

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

function Error({ message }) {
  return (
    <div className="Error">
      <span className="Error__message">{message}</span>
    </div>
  );
}

export default Error;
