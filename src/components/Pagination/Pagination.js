import React from "react";
import PropTypes from "prop-types";
import "./Pagination.scss";

Pagination.propTypes = {
  loading: PropTypes.bool.isRequired,
  nextPageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  previousPageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleNextPage: PropTypes.func.isRequired,
  handlePreviousPage: PropTypes.func.isRequired,
};

function Pagination({ loading, nextPageUrl, previousPageUrl, handleNextPage, handlePreviousPage }) {
  const [disableNext, setDisableNext] = React.useState(false);
  const [disablePrevious, setDisablePrevious] = React.useState(false);

  const handleNextClick = () => {
    setDisableNext(true);
    handleNextPage();
    setTimeout(() => setDisableNext(false), 500);
  };

  const handlePreviousClick = () => {
    setDisablePrevious(true);
    handlePreviousPage();
    setTimeout(() => setDisablePrevious(false), 500);
  };

  return (
    <div className="Pagination">
      <button
        disabled={!previousPageUrl || disablePrevious || loading}
        onClick={handlePreviousClick}
        className="Pagination__btn">
        Previous
      </button>
      <button
        disabled={!nextPageUrl || disableNext || loading}
        onClick={handleNextClick}
        className="Pagination__btn">
        Next
      </button>
    </div>
  );
}

export default Pagination;
