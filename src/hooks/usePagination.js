import React from "react";

const usePagination = () => {
  const [nextPageUrl, setNextPageUrl] = React.useState(null);
  const [previousPageUrl, setPreviousPageUrl] = React.useState(null);

  return {
    nextPageUrl,
    previousPageUrl,
    setNextPageUrl,
    setPreviousPageUrl,
  };
};

export default usePagination;
