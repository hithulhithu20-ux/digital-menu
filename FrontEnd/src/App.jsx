import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Admin/Dashboard';
import FoodOrderForm from './pages/Customer/FoodOrderForm';
import './App.css';

function App() {
  const [activeTableOrder, setActiveTableOrder] = useState(null);

  useEffect(() => {
    // Check if URL has ?table=T-12 parameter (from QR code scan)
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table');
    if (tableParam) {
      setActiveTableOrder(tableParam);
    }
  }, []);

  const handleOpenOrderForm = (tableNo) => {
    setActiveTableOrder(tableNo || 'T-12');
  };

  const handleBackToAdmin = () => {
    // Clear URL query param if present
    if (window.location.search) {
      window.history.pushState({}, '', window.location.pathname);
    }
    setActiveTableOrder(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#0B0E14]">
      {activeTableOrder ? (
        <FoodOrderForm
          tableNo={activeTableOrder}
          onBackToAdmin={handleBackToAdmin}
        />
      ) : (
        <>
          <Dashboard onOpenOrderForm={handleOpenOrderForm} />
        </>
      )}
    </div>
  );
}

export default App;
