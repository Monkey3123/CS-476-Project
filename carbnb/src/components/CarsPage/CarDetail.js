import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import SnackbarAlert from "../RedirectPage/SnackbarAlert";
import "./CarDetail.css";
import { useFetchCar } from "../../hooks/usegetcar";
import { useUserContext } from "../../hooks/useUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCheckCircle, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const CarDetail = () => {
  const { id } = useParams();
  const { car, isLoading, error } = useFetchCar(id);
  const { user } = useUserContext();
  const [showAlert, setShowAlert] = useState(false);

  const handleRentClick = () => {
    if (!user) {
      setShowAlert(true);
    } else {
      // Booking logic
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container className="my-5 car-detail-container">
      <SnackbarAlert
        open={showAlert}
        message="You need to be logged in to book a car."
        onClose={handleCloseAlert}
      />
      <div className="title-section">
        <h1 className="car-title">{car.make} {car.model} - {car.year}</h1>
      </div>
      <div className="image-section1">
        <img src={car.photo} className="car-photo1" alt="Car" />
      </div>
      <Row className="content-row">
        <Col md={8}>
          <Row>
            <Col md={12} className="more-info-section">
              <div className="info-item">
                <FontAwesomeIcon icon={faUser} className="info-icon" />
                <span><strong>Listed by:</strong> {car.listerid}</span>
              </div>
              <div className="info-item">
                <FontAwesomeIcon icon={faCheckCircle} className="info-icon" />
                <span><strong>Free Cancellation:</strong> Get a full refund if you change your mind</span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="car-detail-section">
              <h2 className="section-title">Car Details</h2>
              <hr className="fancy-line" />
              <Card.Text><strong>Odometer:</strong> {car.odometer}</Card.Text>
              <Card.Text><strong>Transmission:</strong> {car.transmission}</Card.Text>
              <Card.Text><strong>Fuel Type:</strong> {car.fuelType}</Card.Text>
              <Card.Text><strong>Seating Capacity:</strong> {car.seatingCapacity}</Card.Text>
              <Card.Text><strong>Color:</strong> {car.color}</Card.Text>
              <Card.Text><strong>Description:</strong> {car.description}</Card.Text>
              <Card.Text><strong>Location:</strong> {car.location}</Card.Text>
              <Card.Text><strong>Available From:</strong> {car.fromDate} {car.fromTime}</Card.Text>
              <Card.Text><strong>Available To:</strong> {car.toDate} {car.toTime}</Card.Text>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="price-breakdown-col">
          <div className="car-price-section">
            <h2 className="section-title">Price Breakdown</h2>
            <hr className="fancy-line" />
            <Card.Text><strong>Daily Rate:</strong> ${car.dailyRate}</Card.Text>
            <Card.Text><strong>Service Fee:</strong> ${Math.round(car.dailyRate * 0.1)}</Card.Text>
            <Card.Text><strong>Total:</strong> ${Math.round(car.dailyRate * 1.1)}</Card.Text>
            <button onClick={handleRentClick} className="btn" style={{ backgroundColor: '#324b5f', color: '#ffffff', borderColor: '#001f3f', width: '100%'}}>
              Book Now
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetail;
