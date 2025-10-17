import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout component={<Dashboard />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <MainLayout component={<Products />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <MainLayout component={<Sales />} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

// ✅ MainLayout with dark theme
const MainLayout = ({ component }) => (
  <div
    style={{
      minHeight: '100vh',
      backgroundColor: '#2d3250', // dark-blue background
      color: '#fff',              // white text
      fontFamily: "'Raleway', sans-serif",
      paddingTop: '20px',
    }}
  >
    <Navbar />
    <div className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
      {component}
    </div>
  </div>
);

export default App;
