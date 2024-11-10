import React from 'react';
import './ContactPhoto.css'; // Import custom CSS for styling

const ContactPhoto = () => {
  // Image URL
  const imageUrl = '/assets/img/landscape-8336550_1280.jpg'; // Replace with your image link

  return (
    <div className="contact-photo-container" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="contact-photo-text">
        Контакты
      </div>
    </div>
  );
}

export default ContactPhoto;
