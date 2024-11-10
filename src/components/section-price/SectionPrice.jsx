// src/pages/SectionPrice.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getDocs, collection } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { PriceCard }from '../'; // Import your PriceCard component

const SectionPrice = () => {
  const [priceCards, setPriceCards] = useState([]);

  // Fetch price cards from Firebase
  useEffect(() => {
    const fetchPriceCards = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'priceCards'));
        const fetchedPriceCards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPriceCards(fetchedPriceCards);
      } catch (err) {
        console.error('Error fetching price cards:', err);
      }
    };

    fetchPriceCards();
  }, []);

  return (
    <Container className="section-price-container">
      <Row className="justify-content-center">
        {priceCards.map((card) => (
          <Col key={card.id} md={6} className="mb-4">
            <PriceCard
              title={card.title}
              priceRuble={card.priceRuble}
              features={card.features}
              bgColor={card.bgColor}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SectionPrice;
