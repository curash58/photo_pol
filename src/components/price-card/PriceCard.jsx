import React from 'react';
import { Card } from 'react-bootstrap'; // Import React Bootstrap Card
import { MdCurrencyRuble } from "react-icons/md"; // Import ruble icon
import './PriceCard.css'; // Import custom CSS

const PriceCard = ({ title, priceRuble, features, bgColor }) => {
  return (
    <Card className="price-card mt-2">
      {/* Only this section has a background color */}
      <div className="price-card-header" style={{ backgroundColor: bgColor || '#f8f9fa' }}>
        <Card.Body className='text-center'>
          <p className="format-text">ФОРМАТ</p>
          <Card.Title className="price-card-title">{title}</Card.Title>
          <div className="price-card-price">
            <span className="price">
              {priceRuble} <MdCurrencyRuble />
            </span>
          </div>
        </Card.Body>
      </div>

      {/* The rest of the card is transparent */}
      <Card.Body className="price-card-body text-center">
        <p className="price-card-includes-text">ТАКОЙ ФОРМАТ СЪЁМКИ ВКЛЮЧАЕТ В СЕБЯ</p>
        <ul className="price-card-features">
          {features.map((feature, index) => (
            <li key={index} className="feature-item">
              {feature}
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default PriceCard;
