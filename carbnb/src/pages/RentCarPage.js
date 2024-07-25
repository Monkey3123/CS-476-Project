import "../components/Styles/CarPage.css";
import Card from "../components/Assets/Card";
import { useFetchCars } from "../hooks/usegetallCar";
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
      <div className="sort-options">
        <label htmlFor="sort">Sort by price: </label>
        <button
          onClick={handleSortChange}
          className="sort-btn"
          aria-label={`Sort by price ${
            sortOption === "asc" ? "ascending" : "descending"
          }`}
        >
          {sortOption === "asc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
        </button>
      </div>
      {isLoading && <p>Loading cars...</p>}
      {error && <p>{error}</p>}
      <div className="cards-container">
        {cars.map((car) => (
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

export default CarPage;
