import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Container, Button, Form, Table } from 'react-bootstrap';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { auth, firestore } from '../../firebaseConfig';
import DatePicker from "react-multi-date-picker"; // Импорт календаря
import { CreateCatalogForm, AddPhotoForm, CatalogList, AdminMainCategories, AdminPriceList } from '../../components';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [catalogs, setCatalogs] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]); // Даты, выбранные в календаре
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
      const filteredDates = fetchedDates.filter((date) => new Date(date.date) >= new Date());
      setAvailableDates(filteredDates);
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

  const handleAddDates = async () => {
    if (selectedDates.length === 0) {
      alert('Выберите хотя бы одну дату');
      return;
    }
  
    try {
      const addedDates = [];
      for (const date of selectedDates) {
        // Преобразуем дату в объект Date только если это строка или другой тип
        const parsedDate = date instanceof Date ? date : new Date(date);
        if (isNaN(parsedDate)) {
          console.error('Неверный формат даты:', date);
          continue;
        }
  
        const formattedDate = parsedDate.toISOString().split('T')[0]; // Преобразуем в "YYYY-MM-DD"
        const addedDoc = await addDoc(collection(firestore, 'availableDates'), {
          date: formattedDate,
        });
        addedDates.push({ id: addedDoc.id, date: formattedDate });
      }
      setAvailableDates([...availableDates, ...addedDates]);
      setSelectedDates([]); 
      // alert('Даты успешно добавлены');
    } catch (error) {
      console.error('Ошибка при добавлении дат:', error);
      alert('Не удалось добавить даты');
    }
  };

  const handleDeleteDate = async (dateId) => {
    try {
      await deleteDoc(doc(firestore, 'availableDates', dateId));
      setAvailableDates(availableDates.filter((date) => date.id !== dateId));
    } catch (error) {
      console.error('Error deleting date:', error);
      alert('Не удалось удалить дату');
    }
  };

  const handleDeletePastDates = () => {
    const currentDate = new Date();
    const filteredDates = availableDates.filter((date) => new Date(date.date) >= currentDate);
    setAvailableDates(filteredDates);
  };

  const handleDeleteCatalog = async (catalogId) => {
    try {
      await deleteDoc(doc(firestore, 'photoCatalogs', catalogId));
      setCatalogs(catalogs.filter((catalog) => catalog.id !== catalogId));
      alert('Каталог успешно удалён');
    } catch (error) {
      console.error('Error deleting catalog:', error);
      alert('Не удалось удалить каталог');
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

      {/* Форма для выбора дат */}
      <Form className="mb-4">
        <Form.Group>
          <Form.Label>Выберите доступные даты</Form.Label>
          <DatePicker
            multiple
            value={selectedDates}
            onChange={setSelectedDates}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddDates} className="mt-3">
          Добавить выбранные даты
        </Button>
        <Button
          variant="warning"
          onClick={handleDeletePastDates}
          className="mt-3 ms-3"
        >
          Удалить прошедшие даты
        </Button>
      </Form>

      {/* Таблица доступных дат */}
      <div className="mb-4">
  <h5>Список доступных дат:</h5>
  {availableDates.length > 0 ? (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Дата</th>
          <th>Действие</th>
        </tr>
      </thead>
      <tbody>
        {availableDates
          .slice() // Создаем копию массива, чтобы не мутировать `availableDates`
          .sort((a, b) => new Date(a.date) - new Date(b.date)) // Сортируем по дате
          .map((date) => (
            <tr key={date.id}>
              <td>{date.date}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteDate(date.id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
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