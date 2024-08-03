import React, { useState } from "react";
import Map from "../components/Assets/Map"; // Component to display a map
import { useNavigate } from "react-router-dom"; // Hook for navigation
import "../components/Styles/FindCars.css"; // Styles specific to this component

const FindCars = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const handleLocationSelect = (lat, lng) => {
    setLocation({ lat, lng });
  };

  const handleSubmit = () => {
    try {
      const lat = location.lat.lat;
      const lng = location.lat.lng;
      navigate(`/CarPage?lat=${lat}&lng=${lng}`);
    } catch (error) {
      alert("Please select a location on the map.");
    }
  };
  return (
    <div className="find-cars-container">
      {currentStep === 0 ? (
        <div className="welcome-text">
          <h1>Find Your Perfect Car</h1>
          <p>
            Use the map to select your location. Once you've chosen a spot,
            you’ll see available cars near you.
          </p>
          <button
            className="btn fancy-button"
            onClick={() => setCurrentStep(1)}
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="find-cars-box">
          <div className="d-flex justify-content-center">
            <Map onLocationSelect={handleLocationSelect} />
          </div>
          <div className="button-container">
            <button className="find-cars-button" onClick={handleSubmit}>
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindCars;
