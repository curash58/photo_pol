import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './PhotoCardMain.css'; // Import CSS for styling

const PhotoCardMain = ({ imageSrc, title, link }) => {
  const navigate = useNavigate(); // Hook to handle navigation

  // Function to handle button click
  const handleButtonClick = () => {
    navigate(link); // Navigate to the provided link
  };

  return (
    <div className="photo-card-main">
      <div className="photo-card-image-container">
        <img src={imageSrc} alt={title} className="photo-card-image" />
      </div>
      <h2 className="photo-card-title">{title}</h2>
      <button className="photo-card-button" onClick={handleButtonClick}>
        СМОТРЕТЬ В ПОРТФОЛИО &gt;
      </button>
    </div>
  );
};

export default PhotoCardMain;
