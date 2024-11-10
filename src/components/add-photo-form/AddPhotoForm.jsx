// src/pages/AddPhotoForm.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { firestore, storage } from '../../firebaseConfig';
import { uploadPhotoHelper } from '../'; // Вспомогательная функция для загрузки фото

const AddPhotoForm = () => {
  const [newPhotoFiles, setNewPhotoFiles] = useState([]); // Массив для хранения нескольких файлов
  const [catalogs, setCatalogs] = useState([]);
  const [selectedCatalogId, setSelectedCatalogId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'photoCatalogs'));
        const fetchedCatalogs = [];
        querySnapshot.forEach((doc) => {
          fetchedCatalogs.push({ id: doc.id, ...doc.data() });
        });
        setCatalogs(fetchedCatalogs);
      } catch (err) {
        console.error('Ошибка при получении каталогов:', err);
        setError('Не удалось получить каталоги.');
      }
    };

    fetchCatalogs();
  }, []);

  const handleAddPhotos = async (e) => {
    e.preventDefault();
    setError('');

    if (!newPhotoFiles.length || !selectedCatalogId) {
      setError('Пожалуйста, выберите каталог и загрузите фотографии.');
      return;
    }

    try {
      const photoUrls = await Promise.all(
        newPhotoFiles.map((file) => uploadPhotoHelper(file, storage))
      );

      if (photoUrls.some((url) => !url)) throw new Error('Не удалось загрузить одно или несколько фото.');

      const catalogRef = doc(firestore, 'photoCatalogs', selectedCatalogId);
      const existingImages = catalogs.find((catalog) => catalog.id === selectedCatalogId).images || [];

      await updateDoc(catalogRef, {
        images: [...existingImages, ...photoUrls],
      });

      alert('Фотографии успешно добавлены');
      setNewPhotoFiles([]); // Очистка выбранных файлов
    } catch (err) {
      console.error('Ошибка при добавлении фотографий:', err);
      setError('Не удалось добавить фотографии.');
    }
  };

  const handleFileChange = (e) => {
    setNewPhotoFiles([...e.target.files]);
  };

  return (
    <Form onSubmit={handleAddPhotos}>
      <Form.Group className="mb-3">
        <Form.Label>Выберите каталог</Form.Label>
        <Form.Select
          value={selectedCatalogId}
          onChange={(e) => setSelectedCatalogId(e.target.value)}
        >
          <option value="">Выберите каталог</option>
          {catalogs.map((catalog) => (
            <option key={catalog.id} value={catalog.id}>
              {catalog.caption}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Новые фотографии</Form.Label>
        <Form.Control
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </Form.Group>

      {error && <p className="text-danger">{error}</p>}

      <Button type="submit" variant="success">
        Добавить фотографии
      </Button>
    </Form>
  );
};

export default AddPhotoForm;
