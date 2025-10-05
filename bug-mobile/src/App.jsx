import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importe os componentes e páginas
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import ProjetoPage from './pages/ProjetoPage/ProjetoPage';
import RobocarPage from './pages/RobocarPage/RobocarPage';
import ContatoPage from './pages/ContatoPage/ContatoPage';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projeto" element={<ProjetoPage />} />
          <Route path="/robocar" element={<RobocarPage />} />
          <Route path="/contato" element={<ContatoPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;