import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  Container,
  Button,
  Form,
  Table,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, firestore } from "../../firebaseConfig";
import DatePicker from "react-multi-date-picker";
import {
  CreateCatalogForm,
  AddPhotoForm,
  CatalogList,
  AdminMainCategories,
  AdminPriceList,
} from "../../components";
import "./Admin.css";

const Admin = () => {
  const [user, setUser] = useState(null);
  const [catalogs, setCatalogs] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCatalogs();
        fetchAvailableDates();
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const showToast = (message, variant = "Light") => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const fetchCatalogs = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "photoCatalogs")
      );
      const fetchedCatalogs = [];
      querySnapshot.forEach((doc) => {
        fetchedCatalogs.push({ id: doc.id, ...doc.data() });
      });
      setCatalogs(fetchedCatalogs);
    } catch (error) {
      console.error("Error fetching catalogs:", error);
      showToast("Error fetching catalogs", "danger");
    }
  };

  const fetchAvailableDates = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "availableDates")
      );
      const fetchedDates = [];
      querySnapshot.forEach((doc) => {
        fetchedDates.push({ id: doc.id, ...doc.data() });
      });
      const filteredDates = fetchedDates.filter(
        (date) => new Date(date.date) >= new Date()
      );
      setAvailableDates(filteredDates);
    } catch (error) {
      console.error("Error fetching available dates:", error);
      showToast("Error fetching available dates", "danger");
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        showToast("Logged out successfully", "success");
        navigate("/");
      })
      .catch((err) => {
        console.error("Error logging out:", err);
        showToast("Error logging out", "danger");
      });
  };

  const handleAddDates = async () => {
    if (selectedDates.length === 0) {
      showToast("Выберите хотя бы одну дату", "warning");
      return;
    }

    try {
      const addedDates = [];
      for (const date of selectedDates) {
        const parsedDate = date instanceof Date ? date : new Date(date);
        if (isNaN(parsedDate)) {
          console.error("Неверный формат даты:", date);
          continue;
        }

        const formattedDate = parsedDate.toISOString().split("T")[0];
        const addedDoc = await addDoc(collection(firestore, "availableDates"), {
          date: formattedDate,
        });
        addedDates.push({ id: addedDoc.id, date: formattedDate });
      }
      setAvailableDates([...availableDates, ...addedDates]);
      setSelectedDates([]);
      showToast("Даты успешно добавлены", "success");
    } catch (error) {
      console.error("Ошибка при добавлении дат:", error);
      showToast("Не удалось добавить даты", "danger");
    }
  };

  const handleDeleteDate = async (dateId) => {
    try {
      await deleteDoc(doc(firestore, "availableDates", dateId));
      setAvailableDates(availableDates.filter((date) => date.id !== dateId));
      showToast("Дата успешно удалена", "success");
    } catch (error) {
      console.error("Error deleting date:", error);
      showToast("Не удалось удалить дату", "danger");
    }
  };

  const handleDeletePastDates = () => {
    const currentDate = new Date();
    const filteredDates = availableDates.filter(
      (date) => new Date(date.date) >= currentDate
    );

    if (filteredDates.length === availableDates.length) {
      showToast("Нет прошедших дат для удаления", "warning");
      return;
    }

    setAvailableDates(filteredDates);
    showToast("Прошедшие даты успешно удалены", "success");
  };

  const handleDeleteCatalog = async (catalogId) => {
    try {
      await deleteDoc(doc(firestore, "photoCatalogs", catalogId));
      setCatalogs(catalogs.filter((catalog) => catalog.id !== catalogId));
      showToast("Каталог успешно удалён", "success");
    } catch (error) {
      console.error("Error deleting catalog:", error);
      showToast("Не удалось удалить каталог", "danger");
    }
  };

  if (user === null) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <ToastContainer className="live-toast-container">
        {toast.show && (
          <Toast
            bg={toast.variant}
            onClose={() => setToast({ ...toast, show: false })}
            delay={2500}
            autohide
          >
            <Toast.Body>{toast.message}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      <h2 className="text-center mb-4">Админ панель</h2>
      <Button variant="danger" onClick={handleLogout} className="mb-4">
        Выход
      </Button>

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
                .slice()
                .sort((a, b) => new Date(a.date) - new Date(b.date))
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
