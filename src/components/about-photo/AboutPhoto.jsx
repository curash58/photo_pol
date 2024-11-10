import React from 'react';
import './AboutPhoto.css'; // Import the custom CSS for styling

const AboutPhoto = () => {
  // Image URL
  const imageUrl = '/assets/img/dried-flowers-7173793_1280.jpg'; // Replace with your image link

  return (
    <div className="about-photo-container" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="about-photo-text">
        Об авторе
      </div>
    </div>
  );
}

export default AboutPhoto;
