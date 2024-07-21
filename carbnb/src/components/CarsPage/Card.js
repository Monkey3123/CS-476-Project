import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({ id, imgSrc, imgAlt, title, description, price }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/car/${id}`);
  };

  const truncate = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className="card-img-container">
        {imgSrc && <img src={imgSrc} alt={imgAlt} className="card-img" />}
      </div>
      <div className="card-content">
        <h2 className="card-title">{truncate(title, 50)}</h2>
        <p className="card-description">{truncate(description, 55)}</p>
        <div className="card-price">{`$${price} CAD day`}</div>
      </div>
    </div>
  );
};

export default Card;
