import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Modal } from "react-bootstrap";
import SnackbarAlert from "../RedirectPage/SnackbarAlert";
import "./CarDetail.css";
import { useFetchCar } from "../../hooks/usegetcar";
import { useUserContext } from "../../hooks/useUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCheckCircle,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useBooked } from "../../hooks/useBooked";
import { useListerName } from "../../hooks/useListerName";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { car, isLoading, error } = useFetchCar(id);
  const { user } = useUserContext();
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");
  const { booked } = useBooked();
  const handleRentClick = async () => {
    if (!user) {
      setShowAlert(true);
    } else if (car.listerid === user.id) {
      alert("You listed this car");
    } else {
      await booked(car._id);
      setShowModal(true);
    }
  };

  const handleUnrentClick = async () => {
    if (!user) {
      setShowAlert(true);
    } else if (car.renterid != user.id) {
      alert("You did not book this car");
    } else {
      // Booking logic #tejas
      await Unbooked(car._id);
      setShowModal(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate(-1);
  };

  useEffect(() => {
    const fetchCityName = async () => {
      if (car && car.lat && car.long) {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${car.lat},${car.long}&key=YOUR_API_KEY`
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          const results = data.results;
          if (results && results.length > 0) {
            const addressComponents = results[0].address_components;
            const cityComponent = addressComponents.find((component) =>
              component.types.includes("locality")
            );
            setCity(cityComponent ? cityComponent.long_name : "Unknown City");
          }
        } catch (error) {
          console.error("Error fetching city name:", error);
        }
      }
    };

    if (car) {
      fetchCityName();
    }
  }, [car]);

  if (isLoading || listerLoading) {
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

  if (error || listerError) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <p>{error || listerError}</p>
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your booking request for {car.make} {car.model} has been confirmed!
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <div className="title-section">
        <h1 className="car-title">
          {car.make} {car.model} - {car.year}
        </h1>
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
                <span>
                  <strong>Listed by:</strong> {listerName.first}{" "}
                  {listerName.last}
                </span>
              </div>
              <div className="info-item">
                <FontAwesomeIcon icon={faCheckCircle} className="info-icon" />
                <span>
                  <strong>Free Cancellation:</strong> Get a full refund if you
                  change your mind
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} className="car-detail-section">
              <h2 className="section-title">Car Details</h2>
              <hr className="fancy-line" />
              <Card.Text>
                <strong>Odometer:</strong> {car.odometer}
              </Card.Text>
              <Card.Text>
                <strong>Transmission:</strong> {car.transmission}
              </Card.Text>
              <Card.Text>
                <strong>Fuel Type:</strong> {car.fuelType}
              </Card.Text>
              <Card.Text>
                <strong>Seating Capacity:</strong> {car.seatingCapacity}
              </Card.Text>
              <Card.Text>
                <strong>Color:</strong> {car.color}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {car.description}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {city}
              </Card.Text>
              <Card.Text>
                <strong>Available From:</strong> {car.fromDate} {car.fromTime}
              </Card.Text>
              <Card.Text>
                <strong>Available To:</strong> {car.toDate} {car.toTime}
              </Card.Text>
            </Col>
          </Row>
        </Col>
        <Col md={4} className="price-breakdown-col">
          <div className="car-price-section">
            <h2 className="section-title">Price Breakdown</h2>
            <hr className="fancy-line" />
            <Card.Text>
              <strong>Daily Rate:</strong> ${car.dailyRate}
            </Card.Text>
            <Card.Text>
              <strong>Service Fee:</strong> ${Math.round(car.dailyRate * 0.1)}
            </Card.Text>
            <Card.Text>
              <strong>Total:</strong> ${Math.round(car.dailyRate * 1.1)}
            </Card.Text>
            {!car.booked && (
              <button
                onClick={handleRentClick}
                className="btn"
                style={{
                  backgroundColor: "#324b5f",
                  color: "#ffffff",
                  borderColor: "#001f3f",
                  width: "100%",
                }}
              >
                Book Now
              </button>
            )}

            {car.booked && (
              <button
                onClick={handleUnrentClick}
                className="btn"
                style={{
                  backgroundColor: "#324b5f",
                  color: "#ffffff",
                  borderColor: "#001f3f",
                  width: "100%",
                }}
              >
                Cancel Booking
              </button>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetail;
