import React, { useState } from "react";
import carBanner from "../../images/camp.jpg";
import "./ListACarPage.css";
import Clock from "../Date/Clock";
import Calender from "../Date/Calender";
import MyMap from "../Date/Map"; // Ensure to import the correct component
import { useListCar } from "../../hooks/useListCar";
import { useNavigate } from "react-router-dom";

const ListACarPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
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
  const [carPhoto, setCarPhoto] = useState(null); // State to handle file input
  const [errors, setErrors] = useState({}); // State to handle errors

  const { listCar } = useListCar();

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
    setErrors({}); // Clear previous errors
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const uploadFile = async () => {
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
      throw new Error("File upload failed");
    }
  };

  const handleLocationSelect = ({ lat, lng }) => {
    setCarDetails((prevDetails) => ({
      ...prevDetails,
      lat: lat,
      long: lng,
    }));
    console.log("Location Selected:", lat, lng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Car Details:", carDetails);

    try {
      let imgURL = "";
      if (carPhoto) {
        imgURL = await uploadFile();
      }
      await listCar(carDetails, imgURL);
      setCarPhoto(null);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrors({ form: error.message });
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
        <form
          className="form1 p-4 bg-light border rounded"
          onSubmit={handleSubmit}
          encType="multipart/form-data" // Important for file uploads
        >
          <h1>List your vehicle to CaRnR</h1>
          {renderProgressBar()}
          {errors.form && (
            <div className="alert alert-danger">{errors.form}</div>
          )}
          {currentStep === 1 && (
            <div>
              <h2>Car Details</h2>
              <input
                type="text"
                name="make"
                placeholder="Car Make"
                className={`form-control ${errors.make ? "is-invalid" : ""}`}
                value={carDetails.make}
                onChange={handleChange}
              />
              {errors.make && (
                <div className="invalid-feedback">{errors.make}</div>
              )}

              <input
                type="text"
                name="model"
                placeholder="Car Model"
                className={`form-control ${errors.model ? "is-invalid" : ""}`}
                value={carDetails.model}
                onChange={handleChange}
              />
              {errors.model && (
                <div className="invalid-feedback">{errors.model}</div>
              )}

              <input
                type="text"
                name="year"
                placeholder="Model Year"
                className={`form-control ${errors.year ? "is-invalid" : ""}`}
                value={carDetails.year}
                onChange={handleChange}
              />
              {errors.year && (
                <div className="invalid-feedback">{errors.year}</div>
              )}

              <input
                type="text"
                name="odometer"
                placeholder="Odometer Reading"
                className={`form-control ${
                  errors.odometer ? "is-invalid" : ""
                }`}
                value={carDetails.odometer}
                onChange={handleChange}
              />
              {errors.odometer && (
                <div className="invalid-feedback">{errors.odometer}</div>
              )}

              <input
                type="text"
                name="transmission"
                placeholder="Transmission"
                className={`form-control ${
                  errors.transmission ? "is-invalid" : ""
                }`}
                value={carDetails.transmission}
                onChange={handleChange}
              />
              {errors.transmission && (
                <div className="invalid-feedback">{errors.transmission}</div>
              )}

              <input
                type="text"
                name="fuelType"
                placeholder="Fuel Type"
                className={`form-control ${
                  errors.fuelType ? "is-invalid" : ""
                }`}
                value={carDetails.fuelType}
                onChange={handleChange}
              />
              {errors.fuelType && (
                <div className="invalid-feedback">{errors.fuelType}</div>
              )}

              <input
                type="text"
                name="seatingCapacity"
                placeholder="Seating Capacity"
                className={`form-control ${
                  errors.seatingCapacity ? "is-invalid" : ""
                }`}
                value={carDetails.seatingCapacity}
                onChange={handleChange}
              />
              {errors.seatingCapacity && (
                <div className="invalid-feedback">{errors.seatingCapacity}</div>
              )}

              <input
                type="text"
                name="color"
                placeholder="Color"
                className={`form-control ${errors.color ? "is-invalid" : ""}`}
                value={carDetails.color}
                onChange={handleChange}
              />
              {errors.color && (
                <div className="invalid-feedback">{errors.color}</div>
              )}

              <textarea
                name="description"
                placeholder="Description"
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                value={carDetails.description}
                onChange={handleChange}
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2>Upload Car Photo</h2>
              <input
                type="file"
                onChange={(e) => setCarPhoto(e.target.files[0])}
                className={`form-control ${
                  errors.carPhoto ? "is-invalid" : ""
                }`}
              />
              {errors.carPhoto && (
                <div className="invalid-feedback">{errors.carPhoto}</div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2>Pricing & Availability</h2>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  name="dailyRate"
                  className={`form-control ${
                    errors.dailyRate ? "is-invalid" : ""
                  }`}
                  placeholder="Daily Rate"
                  aria-label="Amount (to the nearest dollar)"
                  value={carDetails.dailyRate}
                  onChange={handleChange}
                />
              </div>
              {errors.dailyRate && (
                <div className="invalid-feedback">{errors.dailyRate}</div>
              )}
              <label className="form-label">
                Choose Pickup and dropoff Location
              </label>
              <div className="d-flex justify-content-center">
                <MyMap
                  onLocationSelect={handleLocationSelect}
                  className="small-map"
                />
              </div>
              {errors.lat && (
                <div className="invalid-feedback">{errors.lat}</div>
              )}
              {errors.long && (
                <div className="invalid-feedback">{errors.long}</div>
              )}

              <div>
                <label className="form-label">From Date :</label>
                <Calender
                  selected={carDetails.fromDate}
                  onChange={(date) => handleDateChange("fromDate", date)}
                />
                <label className="form-label">To Date :</label>
                <Calender
                  selected={carDetails.toDate}
                  onChange={(date) => handleDateChange("toDate", date)}
                />
              </div>
              <div>
                <label className="form-label">From Time :</label>
                <Clock
                  value={carDetails.fromTime}
                  onChange={(time) => handleTimeChange("fromTime", time)}
                />
                <label className="form-label">To Time :</label>
                <Clock
                  value={carDetails.toTime}
                  onChange={(time) => handleTimeChange("toTime", time)}
                />
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
