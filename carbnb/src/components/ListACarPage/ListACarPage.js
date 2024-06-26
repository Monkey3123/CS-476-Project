import React, { useState } from "react";
import carBanner from "../../images/camp.jpg";
import "./ListACarPage.css";
import Clock from "../Date/Clock";
import Calender from "../Date/Calender";
import Map from "../Date/Map";

const ListACarPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderProgressBar = () => {
    const stepPercentage = (currentStep / 4) * 100;
    return (
      <div
        className="progress"
        role="progressbar"
        aria-label="Progress bar"
        aria-valuenow={stepPercentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-bar"
          style={{ width: `${stepPercentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div
      className="banner-image"
      style={{
        backgroundImage: `url(${carBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="signup template d-flex justify-content-center align-items-center vh-100">
        <form className="form1 p-4 bg-light border rounded">
          <h1>List your vehicle to CaRnR</h1>
          {renderProgressBar()}
          {currentStep === 1 && (
            <div>
              <h2>Car Details</h2>

              <input
                type="text"
                placeholder="Car Make"
                className="form-control"
              />
              <input
                type="text"
                placeholder="Car Model"
                className="form-control"
              />

              <input
                type="Text"
                placeholder="Model Year"
                className="form-control"
              />

              <input
                type="text"
                placeholder="Odometer Reading"
                className="form-control"
              />

              <input
                type="text"
                placeholder="Transmission"
                className="form-control"
              />

              <input
                type="text"
                placeholder="Fuel Type"
                className="form-control"
              />

              <input
                type="text"
                placeholder="Seating Capacity"
                className="form-control"
              />

              <input type="text" placeholder="Color" className="form-control" />

              <textarea
                placeholder="Description(You can add aditional features here)...."
                className="form-control"
              ></textarea>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h2>Photos</h2>
              <input type="file" multiple className="form-control" />
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <h2>Pricing & Availability</h2>

              <div class="input-group mb-3">
                <span class="input-group-text">$</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Daily Rate"
                  aria-label="Amount (to the nearest dollar)"
                />
              </div>
              <label className="form-label">
                Choose Pickup and dropoff Location
              </label>
              <div className="d-flex justify-content-center">
                <Map className="small-map"></Map>
              </div>
              <div>
                <label className="form-label">From Date :</label>
                <Calender />
                <label className="form-label">To Date :</label>
                <Calender />
              </div>
              <div>
                <label className="form-label">From Time :</label>
                <Clock />
                <label htmlFor="exampleInputFirstName" className="form-label">
                  To Time :
                </label>
                <Clock />
              </div>
            </div>
          )}
          <div className="mt-3 d-flex justify-content-between">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handlePrev}
              >
                Previous
              </button>
            )}
            {currentStep < 3 && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {currentStep >= 3 && (
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListACarPage;
