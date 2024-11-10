import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './SectionPortfolio.css'; // Import your CSS for styling

const SectionPortfolio = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle clicking on the image
  const handleClick = () => {
    navigate('/portfolio'); // Navigate to the /portfolio route
  };

  return (
    <div
      className="portfolio-section"
      onClick={handleClick} // Handle click event
    >
      <h1 className="portfolio-text">ПОРТФОЛИО</h1>
    </div>
  );
};

export default SectionPortfolio;
