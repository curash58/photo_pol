import React from 'react';
import { Container } from 'react-bootstrap';
import './MainPhoto.css';

const MainPhoto = () => {
  const photoUrl = process.env.PUBLIC_URL + '/assets/img/main_photo_low.jpg';

  return (
    <Container fluid className="main-photo-container">
      <img src={photoUrl} alt="Main Visual" className="main-photo" />
    </Container>
  );
};

export default MainPhoto;
