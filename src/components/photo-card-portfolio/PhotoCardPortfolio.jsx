import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // To handle navigation on click
import './PhotoCardPortfolio.css'; // Custom CSS for hover effect

const PhotoCardPortfolio = ({ imageUrl, caption, id }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/portfolio/${id}`); // Navigate to /:id on card click
  };

  return (
    <Card className="photo-card-portfolio-special" onClick={handleCardClick}>
      <div className="image-container-special">
        <Card.Img src={imageUrl} alt={caption} className="photo-card-image-special" />
      </div>
      <Card.Body className="text-center">
        <Card.Text className="photo-card-caption">{caption}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PhotoCardPortfolio;
