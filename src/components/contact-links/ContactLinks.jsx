import React from 'react';
import './ContactLinks.css'; // Import custom CSS

const ContactLinks = () => {
  return (
    <div className="contact-links-container">
      <p className="contact-intro-text">
        Я всегда открыта новым предложениям и неожиданным путешествиям. Если у вас есть идея по фотосъемке — свадебной, лав-стори, портретной — напишите мне. <br />
        Я буду рада воплотить самую сумасшедшую идею.
      </p>      
      <div className="contact-details">
        <div className="contact-item">
          <h5 className="contact-label">E-mail</h5>
          <p className="contact-info">
            <a href="mailto:ph.polinapavlova@yandex.ru" className="contact-link">ph.polinapavlova@yandex.ru</a>
          </p>
        </div>
        <div className="contact-item">
          <h5 className="contact-label">Телефон</h5>
          <p className="contact-info">
            <a href="tel:+79131023358" className="contact-link">+7 913 102 33 58</a>
          </p>
        </div>
        <div className="contact-item">
          <h5 className="contact-label">Instagram</h5>
          <p className="contact-info">
            <a href="https://instagram.com/poliiiiinnaaa" className="contact-link" target="_blank" rel="noopener noreferrer">@poliiiiinnaaa</a>
          </p>
        </div>
        <div className="contact-item">
          <h5 className="contact-label">Telegram</h5>
          <p className="contact-info">
            <a href="https://t.me/poliiiiiiinaaa" className="contact-link" target="_blank" rel="noopener noreferrer">@poliiiiiiinaaa</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactLinks;
