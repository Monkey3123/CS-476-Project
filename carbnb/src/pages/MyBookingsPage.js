import React from "react";
import { useFetchBookedCars } from "../hooks/useGetBooked";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/Styles/Listings.css";

const MyBookings = () => {
  const { Bookings, isLoading, error } = useFetchBookedCars();

  return (
    <div className="page">
      {isLoading && <p>Loading cars...</p>}
      {error && <p>{error}</p>}
      <div className="Listings">
        {Bookings.map((car) => (
          <Link key={car._id} to={`/car/${car._id}`} className="listing-link">
            <div className="listing-item">
              <img
                className="listing-image"
                src={`${car.photo}`}
                alt={`${car.make} ${car.model}`}
              />
              <div className="listing-details">
                <h3>{`${car.make} ${car.model} - ${car.year}`}</h3>
                <p>{car.description}</p>
                <p
                  style={{
                    color: "#324b5f",
                    fontSize: "1.2 rem",
                    fontWeight: "bold",
                  }}
                >
                  ${car.dailyRate} CAD day
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
