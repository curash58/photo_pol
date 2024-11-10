import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

const AdminPriceList = () => {
  const [priceCards, setPriceCards] = useState([]);
  const [newCard, setNewCard] = useState({
    title: '',
    priceRuble: '',
    features: '',
    bgColor: '#ffffff',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Получение существующих ценовых карточек из Firebase
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
        console.error('Ошибка при получении ценовых карточек:', err);
        setError('Не удалось получить ценовые карточки.');
      }
    };

    fetchPriceCards();
  }, []);

  // Обработка изменений в форме
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  // Добавление новой ценовой карточки
  const handleAddPriceCard = async () => {
    setError('');
    setSuccess(false);

    if (!newCard.title || !newCard.priceRuble || !newCard.features) {
      setError('Все поля обязательны для заполнения.');
      return;
    }

    try {
      const featuresArray = newCard.features.split(';').map((feature) => feature.trim());
      const docRef = await addDoc(collection(firestore, 'priceCards'), {
        ...newCard,
        features: featuresArray,
      });
      setPriceCards([...priceCards, { id: docRef.id, ...newCard, features: featuresArray }]);
      setNewCard({ title: '', priceRuble: '', features: '', bgColor: '#ffffff' });
      setSuccess(true);
    } catch (err) {
      console.error('Ошибка при добавлении ценовой карточки:', err);
      setError('Не удалось добавить ценовую карточку.');
    }
  };

  // Удаление ценовой карточки
  const handleRemovePriceCard = async (cardId) => {
    try {
      await deleteDoc(doc(firestore, 'priceCards', cardId));
      setPriceCards(priceCards.filter((card) => card.id !== cardId));
      setSuccess(true);
    } catch (err) {
      console.error('Ошибка при удалении ценовой карточки:', err);
      setError('Не удалось удалить ценовую карточку.');
    }
  };

  // Скрытие сообщения об успехе через 5 секунд
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
      <h2 className="text-center mb-4">Управление ценовыми карточками</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Изменения успешно применены!</Alert>}

      {/* Форма для добавления новой ценовой карточки */}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Название</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={newCard.title}
            onChange={handleInputChange}
            placeholder="Введите название"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Цена (в рублях)</Form.Label>
          <Form.Control
            type="text"
            name="priceRuble"
            value={newCard.priceRuble}
            onChange={handleInputChange}
            placeholder="Введите цену"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Характеристики (разделяйте ";")</Form.Label>
          <Form.Control
            type="text"
            name="features"
            value={newCard.features}
            onChange={handleInputChange}
            placeholder="Введите характеристики через точку с запятой"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Цвет фона</Form.Label>
          <Form.Control
            type="color"
            name="bgColor"
            value={newCard.bgColor}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddPriceCard}>
          Добавить ценовую карточку
        </Button>
      </Form>

      {/* Список существующих ценовых карточек */}
      <h4 className="mt-5">Существующие ценовые карточки:</h4>
      <ListGroup>
        {priceCards.map((card) => (
          <ListGroup.Item key={card.id} className="d-flex justify-content-between align-items-center">
            <div>
              <strong>{card.title}</strong> - {card.priceRuble}
              <br />
              <span style={{ fontSize: '0.9em', color: '#555' }}>
                Характеристики: {card.features.join(', ')}
              </span>
            </div>
            <Button variant="danger" onClick={() => handleRemovePriceCard(card.id)}>
              Удалить
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default AdminPriceList;
