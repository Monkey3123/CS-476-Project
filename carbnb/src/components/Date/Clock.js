import React, { useState } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const Clock = () => {
  const [C, setC] = useState("10:00");
  return <TimePicker onChange={setC} value={C} />;
};

export default Clock;
