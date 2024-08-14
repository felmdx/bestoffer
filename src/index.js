import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navbar, Footer } from './components/layout';
import Home from './pages/Home.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound.js';
import Info from './pages/Info.js';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Info" element={<Info />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

