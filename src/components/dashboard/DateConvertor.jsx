"use client";
import React, { useState, useEffect } from "react";

const DateConverter = ({ date }) => {
  const originalDateString = date;
  const originalDate = new Date(originalDateString);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Format the date as "DD-MM-YYYY"
    const formattedDateString = originalDate.toLocaleDateString("en-GB");
    setFormattedDate(formattedDateString);
  }, [originalDate]);

  return <div>{formattedDate}</div>;
};

export default DateConverter;
