import Navbar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { useTheme } from './store/useTheme';
import { Toaster } from 'react-hot-toast';  // Corrected the Toastor to Toaster

function App() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-100" data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Toaster /> {/* Corrected to Toaster for displaying toast notifications */}
    </div>
  );
}

export default App;
