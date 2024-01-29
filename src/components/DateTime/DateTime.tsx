import React, { useState, useEffect } from "react";
import showDate from "utils/showDate";
import { DateFormattedData } from "types";

import "./style.scss";

const DateTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<DateFormattedData>(showDate());

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(showDate());
    };

    const intervalId = setInterval(updateClock, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <p className="date-time">
      {currentTime?.hour}
      <span className="date-time__punctuation-mark">:</span>
      {currentTime?.minute}
      <span className="date-time__punctuation-mark">:</span>
      {currentTime?.second}{" "}
      <span className="date-time__punctuation-mark">-</span> {currentTime?.day}
      <span className="date-time__punctuation-mark">.</span>
      {currentTime?.month}
      <span className="date-time__punctuation-mark">.</span>
      {currentTime?.year}
    </p>
  );
};

export default DateTime;
