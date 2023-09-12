import { Skeleton } from "@mui/material";
import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import "../../../style/loading-style.css";

function LoadingHistoryComponent({ area }) {
  const { promiseInProgress } = usePromiseTracker({ area });
  return (
    promiseInProgress &&
    Array.from({ length: 5 }).map((s, i) => (
      <div key={i} className="skeleton-box">
        <Skeleton variant="circular" width={40} height={40} />
        <div className="skeleton-text-box">
          <Skeleton width={50} height={15} />
          <Skeleton width={"100%"} height={15} />
        </div>
      </div>
    ))
  );
}

export default LoadingHistoryComponent;
