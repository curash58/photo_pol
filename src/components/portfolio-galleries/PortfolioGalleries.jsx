import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { PhotoCardPortfolio } from '../'; // Ensure the import path is correct
import { firestore } from '../../firebaseConfig'; // Import your Firebase setup
import { collection, getDocs } from 'firebase/firestore';

const PortfolioGalleries = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch catalogs from Firebase
    const fetchCatalogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'photoCatalogs'));
        const fetchedCatalogs = [];
        querySnapshot.forEach((doc) => {
          fetchedCatalogs.push({ id: doc.id, ...doc.data() });
        });
        setCatalogs(fetchedCatalogs);
      } catch (error) {
        console.error('Error fetching catalogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading indicator
  }

  return (
    <Container className="portfolio-gallery-container mt-3">
      <Row className="g-4"> {/* g-4 adds gutter space between columns */}
        {catalogs.map((catalog) => (
          <Col md={4} sm={6} key={catalog.id}>
            <PhotoCardPortfolio
              imageUrl={catalog.mainPhoto} // Use the main photo URL from Firestore
              caption={catalog.caption} // Use the caption from Firestore
              id={catalog.id} // Use the ID from Firestore
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PortfolioGalleries;
