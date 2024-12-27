import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from "./components/Footer";
import HeroPage from './pages/HeroPage';
import CategoryPage from './pages/CategoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ minHeight: "80vh", marginTop:"-20px" }}>
      <Routes> 
      <Route path="/" element={<HeroPage />} />
      <Route path="/category/:category" element={<CategoryPage />} />
    </Routes>

      </div>
      <Footer />
    </Router>
  );
}

export default App;
