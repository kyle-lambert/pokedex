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
  const disableNextRef = React.useRef(null);
  const disablePreviousRef = React.useRef(null);

  const handleNextClick = () => {
    setDisableNext(true);
    handleNextPage();
    disableNextRef.current = setTimeout(() => setDisableNext(false), 500);
  };

  const handlePreviousClick = () => {
    setDisablePrevious(true);
    handlePreviousPage();
    disablePreviousRef.current = setTimeout(() => setDisablePrevious(false), 500);
  };

  React.useEffect(() => {
    return () => {
      if (disablePreviousRef.current !== null) {
        clearTimeout(disablePreviousRef.current);
      }
      if (disableNextRef.current !== null) {
        clearTimeout(disableNextRef.current);
      }
    };
  }, []);

  return (
    <div className="Pagination">
      <button
        title="Previous page"
        disabled={!previousPageUrl || disablePrevious || loading}
        onClick={handlePreviousClick}
        className="Pagination__btn">
        Previous
      </button>
      <button
        title="Next page"
        disabled={!nextPageUrl || disableNext || loading}
        onClick={handleNextClick}
        className="Pagination__btn">
        Next
      </button>
    </div>
  );
}

export default Pagination;
