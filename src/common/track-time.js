import React, { useState, useEffect } from "react";

function TrackTime() {
  const [time, setTime] = useState(0);
  // const [intervalId, setIntervalId] = useState(null);
  const [pageLoadTime, setPageLoadTime] = useState(Date.now());
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setTime(Date.now() - pageLoadTime);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isActive, pageLoadTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
      if (!document.hidden) {
        setPageLoadTime(Date.now() - time);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [time]);

  const formattedTime = React.useMemo(() => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, [time]);

  return (
    <div className="container">
      <h1>React Measure Time Spent on Page</h1>
      <p>Time Spent on Page: {formattedTime}</p>
    </div>
  );
}

export default TrackTime;
