import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import "./AboutText.css"; // Import custom CSS

const AboutText = () => {
  return (
    <Container className="about-text-container">
      <Row>
        <Col md={6} className="about-text-left">
          <p className="quote-text">
            В каждую съемку я стараюсь вложить особый шарм, который отражает
            индивидуальность моих клиентов. Готова на любые эксперименты📸🤎
          </p>
          {/* <p className="author-text" style={{paddingLeft: 20}}>— Polina</p> */}
        </Col>
        <Col md={6} className="about-text-right">
          <p>
            Привет! Меня зовут Полина и я - фотограф.
          </p>
          <p>
            Расскажу немного о себе: мне 19 лет, живу на два прекрасных города. Родилась и выросла в Республике Башкортостан, в уютной и спокойной Уфе, а после окончания школы переехала в Москву - город бесконечного движения и возможностей. Сейчас учусь в университете на специалиста по медиакоммуникациям 🎓✌🏻
          </p>
          <p>
            Увлекаюсь рисованием, с детства люблю петь, а из музыки нравится стиль ретро 🎶
          </p>
          <p>
            Мечтаю пожить пару месяцев в другой стране, пока на примете солнечная Италия 🇮🇹🤌🏻
          </p>
          <p>
            Съемкой увлечена еще с начальной школы, с каждым годом интерес становился ярче и ярче. До сих пор помню этот трепетный момент, когда у меня появился первый фотоаппарат 💌
          </p>
          <p className="website-link"></p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutText;