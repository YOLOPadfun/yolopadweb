import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Index from './pages/Index';
import Advanced from './pages/Advanced';
import Create from './pages/Create';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/advanced" element={<Advanced />} />
          <Route path="/create" element={<Create />} />
          
        </Routes>
      </Router>
  );
}

export default App;
