import "./CarPage.css";
import Card from "./Card";
import { useFetchCars } from "../../hooks/usegetallCar";

const CarPage = () => {
  const { cars, isLoading, error } = useFetchCars();

  return (
    <div className="page">
      <h2 className="display-4 text-primary text-center font-weight-bold">
        Showing results for Cars in your Area
      </h2>
      {isLoading && <p>Loading cars...</p>}
      {error && <p>{error}</p>}
      <div className="Cards">
        {cars.map((car) => (
          <Card
            key={car._id}
            id={car._id}
            imgSrc={`http://localhost:5050/${car.photo}`}
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
