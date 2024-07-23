import React from "react";
import { useFetchListerCars } from "../../hooks/useCarListings";
import Card from "../CarsPage/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Listings.css";

const MyListings = () => {
  const { listings, isLoading, error } = useFetchListerCars();

  return (
    <div className="page">
      <h2 className="display-4 text-primary text-center font-weight-bold">
        Your Listings
      </h2>
      {isLoading && <p>Loading cars...</p>}
      {error && <p>{error}</p>}
      <div className="Cards">
        {listings.map((car) => (
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

export default MyListings;
