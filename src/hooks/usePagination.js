import React from "react";

const usePagination = () => {
  const [nextPageUrl, setNextPageUrl] = React.useState(null);
  const [previousPageUrl, setPreviousPageUrl] = React.useState(null);

  const resetState = () => {
    setNextPageUrl(null);
    setPreviousPageUrl(null);
  };

  return {
    nextPageUrl,
    previousPageUrl,
    setNextPageUrl,
    setPreviousPageUrl,
    resetState,
  };
};

export default usePagination;
