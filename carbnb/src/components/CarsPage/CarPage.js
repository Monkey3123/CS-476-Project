import "./CarPage.css";
import Card from "./Card";
import { useFetchCars } from "../../hooks/usegetallCar";
import { useState } from "react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const CarPage = () => {
  const { cars, isLoading, error, setSortOrder } = useFetchCars();
  const [sortOption, setSortOption] = useState("asc");

  const handleSortChange = () => {
    const newSortOrder = sortOption === "asc" ? "desc" : "asc";
    setSortOption(newSortOrder);
    setSortOrder(newSortOrder);
  };

  return (
    <div className="page">
      <h2 className="display-4 text-primary text-center font-weight-bold">
        Showing results for Cars in your Area
      </h2>
      <div className="sort-options">
        <label htmlFor="sort">Sort by price: </label>
        <button
          onClick={handleSortChange}
          className="sort-btn"
          aria-label={`Sort by price ${sortOption === "asc" ? "ascending" : "descending"}`}
        >
          {sortOption === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </button>
      </div>
      {isLoading && <p>Loading cars...</p>}
      {error && <p>{error}</p>}
      <div className="Cards">
        {cars.map((car) => (
          <Card
            key={car._id}
            id={car._id}
            imgSrc={`${car.photo}`}
            imgAlt={`${car.make} ${car.model}`}
            title={`${car.make} ${car.model} - ${car.year}`}
            description={car.description}
            buttonText={`Rent for $${car.dailyRate} per day`}
            link=""
          />
        ))}
      </div>
    </div>
  );
};

export default CarPage;
