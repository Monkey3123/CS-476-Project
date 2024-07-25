import React from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const Clock = ({ value, onChange }) => {
  return <TimePicker onChange={onChange} value={value} />;
};

export default Clock;
