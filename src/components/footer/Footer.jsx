import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaInstagram, FaTelegramPlane, FaEnvelope } from 'react-icons/fa'; // Import icons
import './Footer.css'; // Custom styles

const Footer = () => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center text-center" >
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <div className="footer-social-icons">
              <a
                href="https://www.instagram.com/poliiiiinnaaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaInstagram />
              </a>
              <a
                href="https://t.me/poliiiiiiinaaa"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
              >
                <FaTelegramPlane />
              </a>
              <a href="mailto:ph.polinapavlova@yandex.ru" className="social-icon">
                <FaEnvelope />
              </a>
            </div>
          </Col>
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            <p className="footer-text">© 2024 Poliiiiinnaaa <br /> Created by Ars V @Curash58</p>
          </Col>
          <Col xs={12} md={4}>
            <Button variant="outline-dark" className="scroll-to-top-btn" onClick={scrollToTop}>
              Вверх
            </Button>
          </Col>
        </Row>
        {/* <Row className="mt-4 text-center">
          <Col>
            <a href="/privacy-policy" className="footer-link">Privacy Policy</a> |{' '}
            <a href="/terms-of-service" className="footer-link">Terms of Service</a>
          </Col>
        </Row> */}
      </Container>
    </footer>
  );
};

export default Footer;
