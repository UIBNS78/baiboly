import { CircularProgress } from "@mui/material";
import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "../../../style/loading-style.css";

function LoadingSelectedComponent({ area }) {
  const { promiseInProgress } = usePromiseTracker({ area });

  return promiseInProgress && <CircularProgress color="inherit" />;
}

export default LoadingSelectedComponent;
