import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";
import { useFetchCar } from "../../hooks/usegetcar";

const Card = ({ id, imgSrc, imgAlt, title, description, buttonText, link }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/car/${id}`);
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      {imgSrc && <img src={imgSrc} alt={imgAlt} className="card-img" />}
      <h1 className="card-title">{title}</h1>
      <p className="card-description">{description}</p>
      <a href={link} className="card-link">
        {buttonText}
      </a>
    </div>
  );
};

export default Card;
