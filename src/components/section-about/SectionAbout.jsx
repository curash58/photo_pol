import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './SectionAbout.css';

const SectionAbout = () => {

  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle the button click
  const handleButtonClick = () => {
    navigate('/about'); // Navigate to the /about route
  };
  return (
    <Container className="section-about-container">
      <h2 className="about-subtitle">Ваш тёплый фотограф</h2>
      <p className="about-text">
        Для каждого человека я ищу свою особенную историю и стараюсь передать самые искренние эмоции.
      </p>
      <p className="about-text">
        Если у вас нет опыта в фотосессиях, я подскажу, как чувствовать себя свободно перед камерой и получить от съёмки удовольствие.
      </p>
      <Button className="about-button" onClick={handleButtonClick}>ПОЗНАКОМИТЬСЯ</Button>
    </Container>
  );
}

export default SectionAbout;
