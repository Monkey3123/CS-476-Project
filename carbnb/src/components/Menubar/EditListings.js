import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    location: "",
    fromDate: "",
    toDate: "",
    fromTime: "",
    toTime: "",
  });

  useEffect(() => {
    const fetchListing = async () => {
      const response = await fetch(`http://localhost:4000/api/carRoutes/${id}`);
      const data = await response.json();
      setCarDetails(data);
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails({
      ...carDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:4000/api/carRoutes/update/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carDetails),
      }
    );

    if (response.ok) {
      navigate("/mylistings");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Edit Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Make</label>
          <input
            type="text"
            className="form-control"
            name="make"
            value={carDetails.make}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Model</label>
          <input
            type="text"
            className="form-control"
            name="model"
            value={carDetails.model}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Year</label>
          <input
            type="text"
            className="form-control"
            name="year"
            value={carDetails.year}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Odometer</label>
          <input
            type="text"
            className="form-control"
            name="odometer"
            value={carDetails.odometer}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Transmission</label>
          <input
            type="text"
            className="form-control"
            name="transmission"
            value={carDetails.transmission}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fuel Type</label>
          <input
            type="text"
            className="form-control"
            name="fuelType"
            value={carDetails.fuelType}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Seating Capacity</label>
          <input
            type="text"
            className="form-control"
            name="seatingCapacity"
            value={carDetails.seatingCapacity}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Color</label>
          <input
            type="text"
            className="form-control"
            name="color"
            value={carDetails.color}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={carDetails.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Daily Rate</label>
          <input
            type="text"
            className="form-control"
            name="dailyRate"
            value={carDetails.dailyRate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={carDetails.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">From Date</label>
          <input
            type="text"
            className="form-control"
            name="fromDate"
            value={carDetails.fromDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">To Date</label>
          <input
            type="text"
            className="form-control"
            name="toDate"
            value={carDetails.toDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">From Time</label>
          <input
            type="text"
            className="form-control"
            name="fromTime"
            value={carDetails.fromTime}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">To Time</label>
          <input
            type="text"
            className="form-control"
            name="toTime"
            value={carDetails.toTime}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default EditListing;
