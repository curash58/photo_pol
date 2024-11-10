import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import './SectionLink.css'; // Import the CSS for additional styling

const SectionLink = () => {
  return (
    <Container className="section-link-container text-center">
      <h2 className="section-link-title mb-4">Мои контакты</h2>
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="mb-3">
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/poliiiiinnaaa"
            target="_blank"
            rel="noopener noreferrer"
            className="link-item"
          >
           Insta: @poliiiiinnaaa
          </a>
        </Col>
        <Col xs={12} md={8} className="mb-3">
          {/* Telegram Link */}
          <a
            href="https://t.me/pollliiiiinAAAaaa"
            target="_blank"
            rel="noopener noreferrer"
            className="link-item"
          >
            TG канал: @pollliiiiinAAAaaa
          </a>
        </Col>
        <Col xs={12} md={8}>
          {/* Email Link */}
          <a href="mailto:wapokd@djawj.awd" className="link-item">
            Email: wapokd@djawj.awd
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default SectionLink;
