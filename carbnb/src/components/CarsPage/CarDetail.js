import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import "./CarDetail.css";
import SnackbarAlert from "../RedirectPage/SnackbarAlert";
import { useFetchCar } from "../../hooks/usegetcar";
import { useUserContext } from "../../hooks/useUserContext";

const CarDetail = () => {
  const { id } = useParams();
  const { car, isLoading, error } = useFetchCar(id);
  const { user } = useUserContext();
  const [showAlert, setShowAlert] = useState(false);

  const handleRentClick = () => {
    if (!user) {
      setShowAlert(true);
    } else {
      // Booking logic #tejas
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
    <Container className="my-5">
      <SnackbarAlert 
        open={showAlert} 
        message="You need to be logged in to rent a car." 
        onClose={handleCloseAlert} 
      />
      <Card>
        <Row noGutters>
          <Col md={6}>
            <Card.Img variant="top" src={`${car.photo}`} />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>
                {car.make} {car.model} - {car.year}
              </Card.Title>
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
                <strong>Daily Rate:</strong> ${car.dailyRate}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {car.location}
              </Card.Text>
              <Card.Text>
                <strong>Available From:</strong> {car.fromDate} {car.fromTime}
              </Card.Text>
              <Card.Text>
                <strong>Available To:</strong> {car.toDate} {car.toTime}
              </Card.Text>
              <Button variant="primary" onClick={handleRentClick}>
                Rent this car
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default CarDetail;
