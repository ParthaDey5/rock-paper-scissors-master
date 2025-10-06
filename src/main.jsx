import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Bonus from './Bonus.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bonus" element={<Bonus />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
