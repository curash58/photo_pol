// src/pages/MainCategories.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { PhotoCardMain } from '../';

const MainCategories = () => {
  const [mainPhotoCatalogs, setMainPhotoCatalogs] = useState([]);

  useEffect(() => {
    const fetchMainPhotoCatalogs = async () => {
      try {
        // Get the selected main photo catalogs from 'settings/mainPhotoCatalogs'
        const mainPhotoCatalogsDoc = await getDoc(doc(firestore, 'settings', 'mainPhotoCatalogs'));
        const selectedPhotoCatalogs = mainPhotoCatalogsDoc.data().selectedPhotoCatalogs || [];

        // Fetch the details of selected photo catalogs from 'photoCatalogs' collection
        const photoCatalogsSnapshot = await getDocs(collection(firestore, 'photoCatalogs'));
        const fetchedPhotoCatalogs = photoCatalogsSnapshot.docs
          .filter((doc) => selectedPhotoCatalogs.includes(doc.id))
          .map((doc) => ({ id: doc.id, ...doc.data() }));

        setMainPhotoCatalogs(fetchedPhotoCatalogs);
      } catch (err) {
        console.error('Error fetching main photo catalogs:', err);
      }
    };

    fetchMainPhotoCatalogs();
  }, []);

  return (
    <Container className="main-categories-container mt-5">
      <Row className="gy-4">
        {mainPhotoCatalogs.map((catalog) => (
          <Col key={catalog.id} md={6}>
            <PhotoCardMain
              imageSrc={catalog.mainPhoto}
              title={catalog.caption}
              link={`/portfolio/${catalog.id}`}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MainCategories;
