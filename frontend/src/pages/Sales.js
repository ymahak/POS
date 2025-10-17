import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [sales, setSales] = useState([]);

  const load = async () => {
    const [pRes, sRes] = await Promise.all([api.get('/products'), api.get('/sales')]);
    setProducts(pRes.data);
    setSales(sRes.data);
  };

  useEffect(() => { load(); }, []);

  const addToCart = (p) => {
    const exist = cart.find(c => c._id === p._id);
    if (exist) {
      setCart(cart.map(c => c._id === p._id ? { ...c, qty: c.qty + 1 } : c));
    } else {
      setCart([...cart, { ...p, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) => {
    setCart(cart.map(c => c._id === id ? { ...c, qty: Number(qty) } : c));
  };

  const checkout = async () => {
    const payload = cart.map(c => ({ productId: c._id, quantity: c.qty }));
    await api.post('/sales', payload);
    alert('Sale recorded successfully!');
    setCart([]);
    load();
  };

  return (
    <div style={{ color: '#fff', fontFamily: "'Raleway', sans-serif" }}>
      <h2 style={{ marginBottom: '25px', fontWeight: 600 }}>Sales</h2>

      <div className="row g-4">
        {/* Products List */}
        <div className="col-md-6">
          <div
            style={{
              backgroundColor: '#2d3250',
              borderRadius: '15px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
              padding: '20px',
            }}
          >
            <h5 style={{ color: '#fcb17a', marginBottom: '15px' }}>Products</h5>
            {products.map(p => (
              <div
                key={p._id}
                className="d-flex justify-content-between align-items-center mb-2"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#3a3f5c',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                }}
              >
                <span>{p.name} (₹{p.price})</span>
                <button
                  onClick={() => addToCart(p)}
                  style={{
                    backgroundColor: '#fcb17a',
                    border: 'none',
                    color: '#2d3250',
                    fontWeight: 600,
                    padding: '6px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: '0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fba55c')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fcb17a')}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="col-md-6">
          <div
            style={{
              backgroundColor: '#2d3250',
              borderRadius: '15px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
              padding: '20px',
            }}
          >
            <h5 style={{ color: '#fcb17a', marginBottom: '15px' }}>Cart</h5>
            {cart.map(c => (
              <div
                key={c._id}
                className="d-flex justify-content-between align-items-center mb-2"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#3a3f5c',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                }}
              >
                <span>{c.name}</span>
                <input
                  type="number"
                  min="1"
                  value={c.qty}
                  onChange={(e) => updateQty(c._id, e.target.value)}
                  style={{
                    width: 60,
                    borderRadius: '6px',
                    border: 'none',
                    padding: '4px',
                    textAlign: 'center',
                    backgroundColor: '#2d3250',
                    color: '#fff',
                  }}
                />
              </div>
            ))}
            <button
              className="mt-3 w-100"
              disabled={!cart.length}
              onClick={checkout}
              style={{
                backgroundColor: '#fcb17a',
                border: 'none',
                color: '#2d3250',
                fontWeight: 600,
                padding: '10px',
                borderRadius: '8px',
                cursor: cart.length ? 'pointer' : 'not-allowed',
                transition: '0.3s',
              }}
              onMouseOver={(e) => { if(cart.length) e.currentTarget.style.backgroundColor = '#fba55c' }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fcb17a' }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Sales History */}
      <div
        style={{
          marginTop: '30px',
          borderRadius: '15px',
          backgroundColor: '#2d3250',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          overflowX: 'auto',
          padding: '20px',
        }}
      >
        <h5 style={{ color: '#fcb17a', marginBottom: '15px' }}>Sales History</h5>
        <table
          className="table mb-0"
          style={{
            color: '#fff',
            minWidth: '600px',
            backgroundColor: '#3a3f5c',
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #fcb17a' }}>
              <th style={{ color: '#fcb17a' }}>Product</th>
              <th style={{ color: '#fcb17a' }}>Qty</th>
              <th style={{ color: '#fcb17a' }}>Total</th>
              <th style={{ color: '#fcb17a' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(s => (
              <tr key={s._id} style={{ borderBottom: '1px solid #555', backgroundColor: '#2d3250' }}>
                <td>{s.productName}</td>
                <td>{s.quantity}</td>
                <td>₹ {s.totalAmount}</td>
                <td>{new Date(s.soldAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
