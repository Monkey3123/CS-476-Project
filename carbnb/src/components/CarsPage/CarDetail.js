import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import './CarDetail.css';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:5050/api/cars/${id}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card>
        <Row noGutters>
          <Col md={6}>
            <Card.Img variant="top" src={`http://localhost:5050/${car.photo}`} />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title>{car.make} {car.model} - {car.year}</Card.Title>
              <Card.Text><strong>Odometer:</strong> {car.odometer}</Card.Text>
              <Card.Text><strong>Transmission:</strong> {car.transmission}</Card.Text>
              <Card.Text><strong>Fuel Type:</strong> {car.fuelType}</Card.Text>
              <Card.Text><strong>Seating Capacity:</strong> {car.seatingCapacity}</Card.Text>
              <Card.Text><strong>Color:</strong> {car.color}</Card.Text>
              <Card.Text><strong>Description:</strong> {car.description}</Card.Text>
              <Card.Text><strong>Daily Rate:</strong> ${car.dailyRate}</Card.Text>
              <Card.Text><strong>Location:</strong> {car.location}</Card.Text>
              <Card.Text><strong>Available From:</strong> {car.fromDate} {car.fromTime}</Card.Text>
              <Card.Text><strong>Available To:</strong> {car.toDate} {car.toTime}</Card.Text>
              <Button variant="primary">Rent this car</Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default CarDetail;
