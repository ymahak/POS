import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authServie';

const Login = () => {
  const [email, setEmail] = useState('admin@pos.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSignupRedirect = () => {
    navigate('/register');
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#2d3250',
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      <div
        className="d-flex flex-row"
        style={{
          width: '800px',
          borderRadius: '15px',
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          backgroundColor: '#2d3250',
        }}
      >
        {/* Left Form Side */}
        <div
          className="p-5 d-flex flex-column justify-content-center"
          style={{ flex: 1, color: '#fff' }}
        >
          <h2 className="mb-4" style={{ fontWeight: 600 }}>
            Admin Login
          </h2>

          {error && (
            <div
              className="alert"
              style={{ backgroundColor: '#f28b17', color: '#fff' }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              className="alert"
              style={{ backgroundColor: '#42a1f5', color: '#fff' }}
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: '8px',
                  border: 'none',
                  padding: '12px',
                  marginBottom: '15px',
                }}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderRadius: '8px',
                  border: 'none',
                  padding: '12px',
                  marginBottom: '15px',
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: '#fcb17a',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 600,
                color: '#2d3250',
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = '#fba55c')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = '#fcb17a')
              }
            >
              Login
            </button>
          </form>

          <div className="text-center mt-3">
            <p style={{ color: '#c1c1c1', marginBottom: '10px' }}>
              Don't have an account?
            </p>
            <button
              onClick={handleSignupRedirect}
              className="w-100"
              style={{
                backgroundColor: '#2d3250',
                border: '1px solid #fcb17a',
                padding: '10px',
                borderRadius: '8px',
                color: '#fcb17a',
                fontWeight: 600,
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = '#fcb17a') +
                (e.currentTarget.style.color = '#2d3250')
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = '#2d3250') +
                (e.currentTarget.style.color = '#fcb17a')
              }
            >
              Create an Account
            </button>
          </div>
        </div>

        {/* Right Image Side */}
        <div
          style={{
            flex: 1,
            backgroundImage: `url('/LoginHero.png')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
