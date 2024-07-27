// FindCars component:
//
// This component displays a form for finding cars
// It includes date and time pickers and a map component. The user can
// submit the form to navigate to the CarPage.

import React from "react";
import Calender from "../components/Assets/Calender"; // Component for date selection
import Clock from "../components/Assets/Clock"; // Component for time selection
import Map from "../components/Assets/Map"; // Component to display a map
import { useNavigate } from "react-router-dom"; // Hook for navigation
import "../components/Styles/FindCars.css"; // Styles specific to this component

// Functional component to handle the "Find Cars" page
const FindCars = () => {
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // Function to navigate to the CarPage route when called
  const CarPage = () => {
    navigate("/CarPage");
  };

  // JSX to render the "Find Cars" page
  return (
    <div className="bground">
      <div className="box">
        <h1 className="display-1 text-primary text-center font-weight-bold">
          FindCars
        </h1>
        <div className="d-flex justify-content-center">
          {/* Map component to display a map */}
          <Map />
        </div>
        <div className="row">
          <div className="col-4" />

          <div className="col-sm-3">
            <h3>From Date</h3>
            {/* Calendar component for selecting the starting date */}
            <Calender />
            <h3>From Time</h3>
            {/* Clock component for selecting the starting time */}
            <Clock />
          </div>

          <div className="col">
            <h3>To Date</h3>
            {/* Calendar component for selecting the ending date */}
            <Calender />
            <h3>To Time</h3>
            {/* Clock component for selecting the ending time */}
            <Clock />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {/* Button to submit the form and navigate to CarPage */}
          <button className="btn btn-primary" onClick={CarPage}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

// Exporting the component for use in other parts of the application
export default FindCars;
