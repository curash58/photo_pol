import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import './AboutText.css'; // Import custom CSS

const AboutText = () => {
  return (
    <Container className="about-text-container">
      <Row>
        <Col md={6} className="about-text-left">
          <p className="quote-text">
            Я проживаю вашу историю вместе с вами: <br /> от начала и до конца
          </p>
          <p className="author-text" style={{paddingLeft: 20}}>— Polina</p>
        </Col>
        <Col md={6} className="about-text-right">
          <p>
            «Здравствуйте, друг! Меня зовут Аня и я рада, что ты решил заглянуть на эту страничку. 
            Расскажу немножко о себе: мне 26 лет, сейчас я много путешествую по миру и планирую переехать в Корею. 
            Люблю сладости и пиво, четверги и домашние вечеринки. Слушаю джаз, жгу свечи и смотрю дорамы и аниме.
          </p>
          <p>
            Фотография — моя самая большая любовь и страсть. Каждая съёмка для меня — это уникальная и удивительная история. 
            И я проживаю вашу историю вместе с вами: от начала и до конца.
          </p>
          <p>
            На этом сайте вы сможете найти мои работы и ознакомиться с условиями работы и стоимостью услуг. 
            Если вам откликнулось — жду вас на съёмку!»
          </p>
          <p className="website-link"></p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutText;
