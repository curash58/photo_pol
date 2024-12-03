import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Container, Button, Form } from 'react-bootstrap';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../../firebaseConfig';
import { CreateCatalogForm, AddPhotoForm, CatalogList, AdminMainCategories, AdminPriceList } from '../../components';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [catalogs, setCatalogs] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [newDate, setNewDate] = useState(''); // State for the date to add
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCatalogs();
        fetchAvailableDates();
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

  const fetchAvailableDates = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'availableDates'));
      const fetchedDates = [];
      querySnapshot.forEach((doc) => {
        fetchedDates.push({ id: doc.id, ...doc.data() });
      });
      setAvailableDates(fetchedDates);
    } catch (error) {
      console.error('Error fetching available dates:', error);
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
  
  const handleAddDate = async () => {
    if (!newDate) {
      alert('Please select a date');
      return;
    }

    try {
      const addedDoc = await addDoc(collection(firestore, 'availableDates'), {
        date: newDate,
      });
      setAvailableDates([...availableDates, { id: addedDoc.id, date: newDate }]);
      setNewDate('');
      // alert('Date added successfully');
    } catch (error) {
      console.error('Error adding date:', error);
      alert('Failed to add date', error);
    }
  };

  const handleDeleteDate = async (dateId) => {
    try {
      await deleteDoc(doc(firestore, 'availableDates', dateId));
      setAvailableDates(availableDates.filter((date) => date.id !== dateId));
      // alert('Date deleted successfully');
    } catch (error) {
      console.error('Error deleting date:', error);
      alert('Failed to delete date', error);
    }
  };

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

      {/* Form to add available dates */}
      <Form className="mb-4">
        <Form.Group controlId="formDate">
          <Form.Label>Добавить доступную дату</Form.Label>
          <Form.Control
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddDate} className="mt-3">
          Добавить дату
        </Button>
      </Form>

      {/* List of available dates */}
      <div className="mb-4">
        <h5>Список доступных дат:</h5>
        {availableDates.length > 0 ? (
          <ul>
            {availableDates.map((date) => (
              <li key={date.id}>
                {date.date}{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteDate(date.id)}
                >
                  Удалить
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет доступных дат</p>
        )}
      </div>

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