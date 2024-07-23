import React, { useState } from "react";
import carBanner from "../../images/listingbanner.jpg";
import "./ListACarPage.css";
import Clock from "../Date/Clock";
import Calender from "../Date/Calender";
import MyMap from "../Date/Map";
import { useListCar } from "../../hooks/useListCar";
import { useNavigate } from "react-router-dom";

const ListACarPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // Start from the welcome step
  const [carDetails, setCarDetails] = useState({
    make: "",
    model: "",
    year: "",
    odometer: "",
    transmission: "",
    fuelType: "",
    seatingCapacity: "",
    color: "",
    description: "",
    dailyRate: "",
    lat: "",
    long: "",
    fromDate: new Date(),
    toDate: new Date(),
    fromTime: "10:00",
    toTime: "10:00",
  });
  const [carPhoto, setCarPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleDateChange = (name, value) => {
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleTimeChange = (name, value) => {
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const { listCar } = useListCar();

  const uploadFile = async (type) => {
    const formData = new FormData();
    formData.append("file", carPhoto);
    formData.append("upload_preset", "User images");
    try {
      let api = "https://api.cloudinary.com/v1_1/dzbppy2qi/image/upload";
      let response = await fetch(api, {
        method: "POST",
        body: formData,
      });
      let data = await response.json();
      return data.url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationSelect = ({ lat, lng }) => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      lat: lat,
      long: lng,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imgURL = await uploadFile("image");
      await listCar(carDetails, imgURL);
      setCarPhoto(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {currentStep === 0 ? (
        <div className="welcome-section">
          <div className="welcome-text">
            <h1>Welcome to CaRnR</h1>
            <p>List your car and start earning today!</p>
            <button className="btn fancy-button" onClick={handleNext}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <div className="list-car-page">
          <div className="step-progress">
            <div className={`step ${currentStep >= 1 ? "completed" : ""}`}>
              1. Car Details
            </div>
            <div className={`step ${currentStep >= 2 ? "completed" : ""}`}>
              2. Photos
            </div>
            <div className={`step ${currentStep >= 3 ? "completed" : ""}`}>
              3. Pricing & Availability
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="step-content">
                <h2>Car Details</h2>
                <input
                  type="text"
                  name="make"
                  placeholder="Car Make"
                  value={carDetails.make}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="model"
                  placeholder="Car Model"
                  value={carDetails.model}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="year"
                  placeholder="Model Year"
                  value={carDetails.year}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="odometer"
                  placeholder="Odometer Reading"
                  value={carDetails.odometer}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="transmission"
                  placeholder="Transmission"
                  value={carDetails.transmission}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="fuelType"
                  placeholder="Fuel Type"
                  value={carDetails.fuelType}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="seatingCapacity"
                  placeholder="Seating Capacity"
                  value={carDetails.seatingCapacity}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={carDetails.color}
                  onChange={handleChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={carDetails.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-content">
                <h2>Photos</h2>
                <input
                  type="file"
                  name="carPhoto"
                  onChange={(e) => setCarPhoto(e.target.files[0])}
                  required
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-content">
                <h2>Pricing & Availability</h2>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="text"
                    name="dailyRate"
                    placeholder="Daily Rate"
                    value={carDetails.dailyRate}
                    onChange={handleChange}
                  />
                </div>
                <label>Choose Pickup and Dropoff Location</label>
                <MyMap onLocationSelect={handleLocationSelect} />
                <div className="date-time-picker">
                  <label>From Date</label>
                  <Calender
                    selected={carDetails.fromDate}
                    onChange={(date) => handleDateChange("fromDate", date)}
                  />
                  <label>To Date</label>
                  <Calender
                    selected={carDetails.toDate}
                    onChange={(date) => handleDateChange("toDate", date)}
                  />
                  <label>From Time</label>
                  <Clock
                    value={carDetails.fromTime}
                    onChange={(time) => handleTimeChange("fromTime", time)}
                  />
                  <label>To Time</label>
                  <Clock
                    value={carDetails.toTime}
                    onChange={(time) => handleTimeChange("toTime", time)}
                  />
                </div>
              </div>
            )}

            <div className="navigation-buttons">
              {currentStep > 0 && (
                <button type="button" className="btn btn-secondary" onClick={handlePrev}>
                  Previous
                </button>
              )}
              {currentStep < 3 && (
                <button className="btn" onClick={handleNext} style={{ backgroundColor: '#324b5f', color: '#ffffff', borderColor: '#001f3f', width: '9%'}}>
                Next
               </button>
              )}
              {currentStep === 3 && (
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListACarPage;
