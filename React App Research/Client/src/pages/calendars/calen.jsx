import React, { useState } from "react";
import { render } from "react-dom";
import Calendar from "react-calendar";
import "./calender.css";
const ReactCalendar = () => {
  const [date, setDate] = useState(new Date());

  const onChange = date => {
    setDate(date);
  };

  return (
    <div className="App-header">
      <Calendar 
      sx={{margin:2, minHeight:400,minWidth:600,
      backgroundColor:"black",
      }}
      showWeekNumbers onChange={onChange} value={date} />
      {console.log(date)}
      {date.toString()}
    </div>
  );
};

export default ReactCalendar;
