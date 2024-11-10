import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { CiMenuBurger } from 'react-icons/ci'; // Hamburger menu icon
import { TfiClose } from 'react-icons/tfi'; // Close icon
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth
import './Navbar.css'; // Custom styles for animations and colors

const CustomNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if user is logged in
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  // Toggle the menu state
  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <Navbar expand="lg" className="custom-navbar" variant="light" sticky="top">
      <div className="nav-container-icon">
        {/* Mobile-only text */}
        <a
          href="https://www.instagram.com/poliiiiinnaaa/"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-brand-text"
        >
          @poliiiiinnaaa
        </a>

        {/* Custom Toggle Icon */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}>
          <span className="nav-icon">
            {isMenuOpen ? <TfiClose /> : <CiMenuBurger />}
          </span>
        </Navbar.Toggle>
      </div>

      <Navbar.Collapse id="basic-navbar-nav" in={isMenuOpen}>
        <Nav className="mx-auto" onClick={handleLinkClick}>
          <Nav.Link href="/">ГЛАВНАЯ</Nav.Link>
          <Nav.Link href="/portfolio">ПОРТФОЛИО</Nav.Link>
          <Nav.Link href="/price">ИНФО</Nav.Link>
          <Nav.Link href="/about">ОБ АВТОРЕ</Nav.Link>
          <Nav.Link href="/contacts">КОНТАКТЫ</Nav.Link>
          {/* Render Админ link only for authenticated users */}
          {isAuthenticated && <Nav.Link href="/admin">Админ</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
