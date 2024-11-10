// src/pages/CreateCatalogForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { firestore, storage } from '../../firebaseConfig'; // Настройки Firebase
import { uploadPhotoHelper } from '../'; // Вспомогательная функция для загрузки фото

const CreateCatalogForm = () => {
  const [mainPhotoFile, setMainPhotoFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');

  const handleCreateCatalog = async (e) => {
    e.preventDefault();
    setError('');

    if (!mainPhotoFile || !caption) {
      setError('Необходимо загрузить основное фото и заполнить подпись.');
      return;
    }

    try {
      const mainPhotoUrl = await uploadPhotoHelper(mainPhotoFile, storage);
      if (!mainPhotoUrl) throw new Error('Не удалось загрузить основное фото.');

      await addDoc(collection(firestore, 'photoCatalogs'), {
        mainPhoto: mainPhotoUrl,
        caption,
        images: [],
      });

      setMainPhotoFile(null);
      setCaption('');
      alert('Каталог успешно создан');
    } catch (err) {
      console.error('Ошибка при создании каталога:', err);
      setError('Не удалось создать каталог.');
    }
  };

  return (
    <Form onSubmit={handleCreateCatalog}>
      <Form.Group className="mb-3">
        <Form.Label>Фото карточки</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setMainPhotoFile(e.target.files[0])}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Подпись</Form.Label>
        <Form.Control
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Текст"
        />
      </Form.Group>

      {error && <p className="text-danger">{error}</p>}

      <Button type="submit" variant="primary">
        Создать каталог
      </Button>
    </Form>
  );
};

export default CreateCatalogForm;
