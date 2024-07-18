import React, { useState } from "react";
import carBanner from "../../images/camp.jpg";
import "./ListACarPage.css";
import Clock from "../Date/Clock";
import Calender from "../Date/Calender";
import Map from "../Date/Map";
import { useListCar } from "../../hooks/useListCar";
import { useNavigate } from "react-router-dom";

const ListACarPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { mylat, mylong } = Map();
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
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: "",
  });
  const [carPhoto, setCarPhoto] = useState(null); // State to handle file input

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    if (currentStep > 1) {
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
      console.log(data.url);
      return data.url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(mylat, " ", mylong);
    setCarDetails({ ...carDetails, lat: mylat });
    setCarDetails({ ...carDetails, long: mylong });

    try {
      const imgURL = await uploadFile("image");
      console.log("Image URL:", imgURL); // Debug log
      // const carData = { ...carDetails, photo: imgURL };
      // console.log("Car Data:", carData); // Debug log
      await listCar(carDetails, imgURL);
      setCarPhoto(null);
      console.log("File upload success");
    } catch (error) {
      console.error(error);
    }
    navigate("/");
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
          {currentStep === 1 && (
            <div>
              <h2>Car Details</h2>

              <input
                type="text"
                name="make"
                placeholder="Car Make"
                className="form-control"
                value={carDetails.make}
                onChange={handleChange}
              />
              <input
                type="text"
                name="model"
                placeholder="Car Model"
                className="form-control"
                value={carDetails.model}
                onChange={handleChange}
              />

              <input
                type="text"
                name="year"
                placeholder="Model Year"
                className="form-control"
                value={carDetails.year}
                onChange={handleChange}
              />

              <input
                type="text"
                name="odometer"
                placeholder="Odometer Reading"
                className="form-control"
                value={carDetails.odometer}
                onChange={handleChange}
              />

              <input
                type="text"
                name="transmission"
                placeholder="Transmission"
                className="form-control"
                value={carDetails.transmission}
                onChange={handleChange}
              />

              <input
                type="text"
                name="fuelType"
                placeholder="Fuel Type"
                className="form-control"
                value={carDetails.fuelType}
                onChange={handleChange}
              />

              <input
                type="text"
                name="seatingCapacity"
                placeholder="Seating Capacity"
                className="form-control"
                value={carDetails.seatingCapacity}
                onChange={handleChange}
              />

              <input
                type="text"
                name="color"
                placeholder="Color"
                className="form-control"
                value={carDetails.color}
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Description (You can add additional features here)...."
                className="form-control"
                value={carDetails.description}
                onChange={handleChange}
              ></textarea>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h2>Photos</h2>
              <input
                type="file"
                name="carPhoto"
                className="form-control"
                onChange={(e) => setCarPhoto((prev) => e.target.files[0])}
                required
              />
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
                  className="form-control"
                  placeholder="Daily Rate"
                  aria-label="Amount (to the nearest dollar)"
                  value={carDetails.dailyRate}
                  onChange={handleChange}
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
