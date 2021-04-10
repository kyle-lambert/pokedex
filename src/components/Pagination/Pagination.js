import React from "react";
import "./Pagination.scss";

function Pagination({ nextPageUrl, previousPageUrl, handleNextPage, handlePreviousPage }) {
  return (
    <div className="Pagination">
      <button disabled={!previousPageUrl} onClick={handlePreviousPage} className="Pagination__btn">
        Previous
      </button>
      <button disabled={!nextPageUrl} onClick={handleNextPage} className="Pagination__btn">
        Next
      </button>
    </div>
  );
}

export default Pagination;
