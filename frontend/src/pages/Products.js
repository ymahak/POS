import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', stockQty: '' });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/products/${editId}`, form);
      setEditId(null);
    } else {
      await api.post('/products', form);
    }
    setForm({ name: '', price: '', stockQty: '' });
    load();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete product?')) {
      await api.delete(`/products/${id}`);
      load();
    }
  };

  return (
    <div style={{ color: '#fff', fontFamily: "'Raleway', sans-serif" }}>
      <h2 style={{ marginBottom: '25px', fontWeight: 600 }}>Products</h2>

      {/* Form Card */}
      <div
        className="p-4 mb-4"
        style={{
          backgroundColor: '#2d3250', // Darker card background
          borderRadius: '15px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
        }}
      >
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{
                borderRadius: '8px',
                border: 'none',
                padding: '10px',
                backgroundColor: '#3a3f5c',
                color: '#fff',
              }}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              style={{
                borderRadius: '8px',
                border: 'none',
                padding: '10px',
                backgroundColor: '#3a3f5c',
                color: '#fff',
              }}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              placeholder="Stock"
              value={form.stockQty}
              onChange={(e) => setForm({ ...form, stockQty: e.target.value })}
              style={{
                borderRadius: '8px',
                border: 'none',
                padding: '10px',
                backgroundColor: '#3a3f5c',
                color: '#fff',
              }}
              required
            />
          </div>
          <div className="col-md-2">
            <button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: '#fcb17a',
                border: 'none',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: 600,
                color: '#2d3250',
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#fba55c')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#fcb17a')}
            >
              {editId ? 'Save' : 'Add'}
            </button>
          </div>
        </form>
      </div>

      {/* Products Table */}
      <div
        style={{
          overflowX: 'auto',
          borderRadius: '15px',
          backgroundColor: '#2d3250', // Dark table background
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
        }}
      >
        <table className="table mb-0" style={{ color: '#fff', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #fcb17a' }}>
              <th style={{ color: '#fcb17a' }}>Name</th>
              <th style={{ color: '#fcb17a' }}>Price</th>
              <th style={{ color: '#fcb17a' }}>Stock</th>
              <th style={{ color: '#fcb17a' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} style={{ borderBottom: '1px solid #555' }}>
                <td>{p.name}</td>
                <td>₹ {p.price}</td>
                <td>{p.stockQty}</td>
                <td>
                  <button
                    className="btn btn-sm me-2"
                    style={{
                      border: '1px solid #fcb17a',
                      backgroundColor: '#2d3250',
                      color: '#fcb17a',
                      borderRadius: '6px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: '0.3s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#fcb17a';
                      e.currentTarget.style.color = '#2d3250';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#2d3250';
                      e.currentTarget.style.color = '#fcb17a';
                    }}
                    onClick={() => {
                      setForm(p);
                      setEditId(p._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      border: '1px solid #f28b17',
                      backgroundColor: '#2d3250',
                      color: '#f28b17',
                      borderRadius: '6px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: '0.3s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#f28b17';
                      e.currentTarget.style.color = '#2d3250';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#2d3250';
                      e.currentTarget.style.color = '#f28b17';
                    }}
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
