import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authServie';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      style={{
        backgroundColor: '#2d3250',
        padding: '12px 20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ maxWidth: '1200px', margin: '0 auto' }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            color: '#fcb17a',
            fontWeight: 700,
            fontSize: '1.5rem',
            textDecoration: 'none',
          }}
        >
          Mini POS
        </Link>

        {/* Menu Links */}
        <div className="d-flex align-items-center" style={{ gap: '20px' }}>
          <Link
            to="/products"
            style={{
              color: '#fff',
              fontWeight: 500,
              textDecoration: 'none',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#fcb17a')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
          >
            Products
          </Link>
          <Link
            to="/sales"
            style={{
              color: '#fff',
              fontWeight: 500,
              textDecoration: 'none',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#fcb17a')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
          >
            Sales
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#fcb17a',
              border: 'none',
              padding: '8px 18px',
              borderRadius: '8px',
              color: '#2d3250',
              fontWeight: 600,
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#fba55c';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#fcb17a';
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
