import { CircularProgress } from "@mui/material";
import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "../../../style/loading-style.css";

function LoadingSearchComponent({ area }) {
  const { promiseInProgress } = usePromiseTracker({ area });

  return (
    promiseInProgress && (
      <div className="search-loading-box">
        <CircularProgress color="inherit" />
      </div>
    )
  );
}

export default LoadingSearchComponent;
