import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Dashboard = () => {
  const [data, setData] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const load = async () => {
      const [productsRes, salesRes] = await Promise.all([
        api.get('/products'),
        api.get('/sales'),
      ]);
      const products = productsRes.data;
      const sales = salesRes.data;
      const totalProducts = products.length;
      const totalSales = sales.length;
      const totalRevenue = sales.reduce((acc, s) => acc + s.totalAmount, 0);
      setData({ totalProducts, totalSales, totalRevenue });
    };
    load();
  }, []);

  return (
    <div
      style={{
        
        backgroundColor: '#2d3250',
        padding: '40px',
        fontFamily: "'Raleway', sans-serif",
        color: '#fff',
      }}
    >
      <h2 style={{ marginBottom: '30px', fontWeight: 600 }}>Dashboard</h2>

      <div className="d-flex flex-wrap justify-content-between" style={{ gap: '20px' }}>
        {/* Total Products */}
        <div
          className="p-4"
          style={{
            flex: '1 1 250px',
            backgroundColor: '#3a3f5c',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            textAlign: 'center',
            transition: '0.3s',
            cursor: 'pointer',
          }}
        >
          <h5 style={{ color: '#fcb17a', marginBottom: '10px' }}>Total Products</h5>
          <h2 style={{ fontWeight: 700 }}>{data.totalProducts}</h2>
        </div>

        {/* Total Sales */}
        <div
          className="p-4"
          style={{
            flex: '1 1 250px',
            backgroundColor: '#3a3f5c',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            textAlign: 'center',
            transition: '0.3s',
            cursor: 'pointer',
          }}
        >
          <h5 style={{ color: '#fcb17a', marginBottom: '10px' }}>Total Sales</h5>
          <h2 style={{ fontWeight: 700 }}>{data.totalSales}</h2>
        </div>

        {/* Total Revenue */}
        <div
          className="p-4"
          style={{
            flex: '1 1 250px',
            backgroundColor: '#3a3f5c',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            textAlign: 'center',
            transition: '0.3s',
            cursor: 'pointer',
          }}
        >
          <h5 style={{ color: '#fcb17a', marginBottom: '10px' }}>Total Revenue</h5>
          <h2 style={{ fontWeight: 700 }}>₹ {data.totalRevenue.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
