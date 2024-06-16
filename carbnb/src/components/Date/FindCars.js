import React from "react";
import Calender from "./Calender";
import Clock from "./Clock";
import But from "./But";
import Map from "./Map";
const FindCars = () => {
  return (
    <div>
      <h1 className="display-1 text-primary text-center font-weight-bold">
        FindCars
      </h1>
      <div className="d-flex justify-content-center">
        <Map></Map>
      </div>
      <div className="row">
        <div className="col-4" />

        <div className="col-sm-3">
          <h3>From Date</h3>
          <Calender />
          <h3>From Time</h3>
          <Clock />
        </div>

        <div className="col">
          <h3>To Date</h3>
          <Calender />
          <h3>To Time</h3>
          <Clock />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <But>Submit</But>
      </div>
    </div>
  );
};

export default FindCars;
