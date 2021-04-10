import React from "react";
import "./LoadingSpinner.scss";

function LoadingSpinner(props) {
  return (
    <div className="LoadingSpinner">
      <div className="LoadingSpinner__outer">
        <span className="LoadingSpinner__circle"></span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
