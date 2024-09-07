import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterListPage from './pages/CharacterListPage';
import CharacterDetailPage from './pages/CharacterDetailPage';
import LocationPage from './pages/LocationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterListPage />} />
        <Route path="/character/:id" element={<CharacterDetailPage />} />
        <Route path="/locations" element={<LocationPage />} />
      </Routes>
    </Router>
  );
};

export default App;