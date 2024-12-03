import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomNavbar, Footer, ScrollToTop, OpenPhotoCard} from './components';
import { Home, Portfolio, Price, HowWork, About, Contacts, Admin, Login, NotFound } from './containers';
import './App.css';

function App() {
  return (
    <Router>
      <div className="main-content">
        <CustomNavbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/price" element={<Price />} />
          <Route path="/how-work" element={<HowWork />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/kkkllljjj" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/portfolio/:id" element={<OpenPhotoCard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;