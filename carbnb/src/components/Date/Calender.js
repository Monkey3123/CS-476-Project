import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calender = () => {
  const [D, setD] = useState(new Date());
  return (
    <>
      <DatePicker
        selected={D}
        onChange={(D) => {
          setD(D);
          console.log(D);
        }}
      />
    </>
  );
};

export default Calender;
