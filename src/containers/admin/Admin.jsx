// src/pages/Admin.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Container, Button } from 'react-bootstrap';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../../firebaseConfig'; // Import your Firebase setup
import { CreateCatalogForm, AddPhotoForm, CatalogList, AdminMainCategories, AdminPriceList } from '../../components';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [catalogs, setCatalogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCatalogs();
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

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
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert('Logged out successfully');
        navigate('/');
      })
      .catch((err) => {
        console.error('Error logging out:', err);
      });
  };

  // Function to delete a catalog
  const handleDeleteCatalog = async (catalogId) => {
    try {
      await deleteDoc(doc(firestore, 'photoCatalogs', catalogId));
      setCatalogs(catalogs.filter((catalog) => catalog.id !== catalogId));
      alert('Catalog deleted successfully');
    } catch (error) {
      console.error('Error deleting catalog:', error);
      alert('Failed to delete catalog');
    }
  };

  if (user === null) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Админ панель</h2>
      <Button variant="danger" onClick={handleLogout} className="mb-4">
        Выход
      </Button>
      <CreateCatalogForm />
      <hr />
      <AddPhotoForm />
      <CatalogList catalogs={catalogs} onDeleteCatalog={handleDeleteCatalog} />
      <AdminMainCategories />
      <AdminPriceList />
    </Container>
  );
};

export default Admin;