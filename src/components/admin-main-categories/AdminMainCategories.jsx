import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import './AdminMainPhotoCatalogs.css';

const AdminMainPhotoCatalogs = () => {
  const [photoCatalogs, setPhotoCatalogs] = useState([]);
  const [selectedCatalogId, setSelectedCatalogId] = useState('');
  const [selectedPhotoCatalogs, setSelectedPhotoCatalogs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Получение всех фото-каталогов из Firebase
  useEffect(() => {
    const fetchPhotoCatalogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'photoCatalogs'));
        const fetchedPhotoCatalogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPhotoCatalogs(fetchedPhotoCatalogs);

        // Загрузка выбранных каталогов для главного экрана
        const mainPhotoCatalogsDoc = await getDoc(doc(firestore, 'settings', 'mainPhotoCatalogs'));
        if (mainPhotoCatalogsDoc.exists()) {
          setSelectedPhotoCatalogs(mainPhotoCatalogsDoc.data().selectedPhotoCatalogs || []);
        }
      } catch (err) {
        console.error('Ошибка при получении фото-каталогов:', err);
        setError('Не удалось получить фото-каталоги.');
      }
    };

    fetchPhotoCatalogs();
  }, []);

  // Функция для обновления основных фото-каталогов в Firebase
  const updateMainPhotoCatalogs = async (updatedCatalogs) => {
    setError('');
    setSuccess(false);

    try {
      const mainPhotoCatalogsDocRef = doc(firestore, 'settings', 'mainPhotoCatalogs');
      await setDoc(mainPhotoCatalogsDocRef, { selectedPhotoCatalogs: updatedCatalogs });
      setSuccess(true);
    } catch (err) {
      console.error('Ошибка при обновлении основных фото-каталогов:', err);
      setError('Не удалось обновить основные фото-каталоги.');
    }
  };

  // Функция для добавления фото-каталога в основной список
  const handleAddPhotoCatalog = () => {
    if (!selectedCatalogId) {
      setError('Пожалуйста, выберите фото-каталог для добавления.');
      return;
    }
    if (selectedPhotoCatalogs.includes(selectedCatalogId)) {
      setError('Этот фото-каталог уже в основном списке.');
      return;
    }

    const updatedCatalogs = [...selectedPhotoCatalogs, selectedCatalogId];
    setSelectedPhotoCatalogs(updatedCatalogs);
    updateMainPhotoCatalogs(updatedCatalogs); // Сохранение сразу в Firebase
  };

  // Функция для удаления фото-каталога из основного списка
  const handleRemovePhotoCatalog = () => {
    if (!selectedCatalogId) {
      setError('Пожалуйста, выберите фото-каталог для удаления.');
      return;
    }
    if (!selectedPhotoCatalogs.includes(selectedCatalogId)) {
      setError('Этот фото-каталог не находится в основном списке.');
      return;
    }

    const updatedCatalogs = selectedPhotoCatalogs.filter((id) => id !== selectedCatalogId);
    setSelectedPhotoCatalogs(updatedCatalogs);
    updateMainPhotoCatalogs(updatedCatalogs); // Сохранение сразу в Firebase
  };

  // Эффект для скрытия сообщения об успехе через 5 секунд
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000); // 5000 миллисекунд = 5 секунд

      // Очистка таймера при размонтировании компонента или изменении success
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Выбор основных фото-каталогов</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Изменения успешно применены!</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Выберите фото-каталог</Form.Label>
          <Form.Select
            value={selectedCatalogId}
            onChange={(e) => setSelectedCatalogId(e.target.value)}
          >
            <option value="">Выберите каталог</option>
            {photoCatalogs.map((catalog) => (
              <option key={catalog.id} value={catalog.id}>
                {catalog.caption}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      <Button variant="primary" className="me-2" onClick={handleAddPhotoCatalog}>
        Добавить в основные
      </Button>
      <Button variant="danger" className="remove-from" onClick={handleRemovePhotoCatalog}>
        Удалить из основных
      </Button>
    </Container>
  );
};

export default AdminMainPhotoCatalogs;
