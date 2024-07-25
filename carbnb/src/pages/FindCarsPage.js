import React from "react";
import Calender from "../components/Assets/Calender";
import Clock from "../components/Assets/Clock";
import Map from "../components/Assets/Map";
import { useNavigate } from "react-router-dom";
import "../components/Styles/FindCars.css";
const FindCars = () => {
  const navigate = useNavigate();

  const CarPage = () => {
    navigate("/CarPage");
  };

  return (
    <div className="bground">
      <div className="box">
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
          <button className="btn btn-primary" onClick={CarPage}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindCars;
