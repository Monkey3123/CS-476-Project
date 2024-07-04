import React, { useEffect, useState } from 'react';
import './CarPage.css';
import Card from './Card';

const CarPage = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5050/api/cars'); // Adjust the URL as necessary
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="page">
      <h2 className="display-4 text-primary text-center font-weight-bold">
        Showing results for Cars in your Area
      </h2>
      <div className="Cards">
        {cars.map(car => (
          <Card
            key={car._id}
            imgSrc={`http://localhost:5050/${car.photo}`}
            imgAlt={`${car.make} ${car.model}`}
            title={`${car.make} ${car.model} - ${car.year}`}
            description={car.description}
            buttonText={`Rent for $${car.dailyRate} per day`}
            link="#"
          />
        ))}
      </div>
    </div>
  );
};

export default CarPage;
