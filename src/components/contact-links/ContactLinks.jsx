import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebaseConfig"; // Update the path as per your project structure
import "./ContactLinks.css";
import "react-calendar/dist/Calendar.css";

const ContactLinks = () => {
  const [date, setDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);

  // Fetch available dates from Firebase Firestore
  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "availableDates")
        );
        const dates = querySnapshot.docs.map((doc) => {
          const [year, month, day] = doc.data().date.split("-").map(Number);
          return new Date(year, month - 1, day);
        });
        setAvailableDates(dates);
      } catch (error) {
        console.error("Error fetching available dates:", error);
      }
    };

    fetchAvailableDates();
  }, []);

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isAvailable = (date) => {
    if (isPastDate(date)) {
      return false;
    }
    return availableDates.some(
      (availableDate) =>
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate()
    );
  };

  return (
    <div className="contact-links-container">
      <p className="contact-intro-text">
        Запись осуществляется через директ в инстаграм, либо через телеграмм.
        Ниже представлен календарь, где показаны свободные даты 🤎📸
      </p>
      <div className="calendar-container">
        <h5 className="calendar-label">Свободные даты:</h5>
        <div className="example-dates mb-3">
          <div className="example-item">
            <span className="example-date available-date"></span>
            <span className="example-text">Свободные даты отмечены так 
              <img className="example-date-img" src="./assets/img/11.png" alt="" />
            </span>
          </div>
          {/* <div className="example-item">
            <span className="example-date unavailable-date"></span>
            <span className="example-text">Занятая дата 
            <img className="example-date-img" src="./assets/img/4.png" alt="" />
            </span>
          </div> */}
        </div>
        <Calendar
          onChange={setDate}
          value={date}
          className="custom-calendar"
          tileClassName={({ date, view }) =>
            view === "month" && isAvailable(date)
              ? "available-date"
              : "unavailable-date"
          }
          tileDisabled={({ date }) => !isAvailable(date)}
        />
      </div>

      <div className="contact-details">
        <div className="contact-item">
          <h5 className="contact-label">Instagram</h5>
          <p className="contact-info">
            <a
              href="https://instagram.com/poliiiiinnaaa"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              @poliiiiinnaaa
            </a>
          </p>
        </div>
        <div className="contact-item">
          <h5 className="contact-label">Telegram</h5>
          <p className="contact-info">
            <a
              href="https://t.me/poliiiiiiinaaa"
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              @poliiiiiiinaaa
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactLinks;
