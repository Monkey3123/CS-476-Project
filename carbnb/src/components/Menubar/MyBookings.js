import React from "react";
import { useFetchBookedCars } from "../../hooks/useGetBooked";
import Card from "../CarsPage/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Listings.css";

const MyBookings = () => {
  const { Bookings, isLoading, error } = useFetchBookedCars();

  return (
    <div className="page">
      <h2 className="display-4 text-primary text-center font-weight-bold">
        Your Bookings
      </h2>
      {isLoading && <p>Loading cars...</p>}
      {error && <p>{error}</p>}
      <div className="Cards">
        {Bookings.map((car) => (
          <Card
            key={car._id}
            id={car._id}
            imgSrc={`${car.photo}`}
            imgAlt={`${car.make} ${car.model}`}
            title={`${car.make} ${car.model} - ${car.year}`}
            description={car.description}
            price={car.dailyRate}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
