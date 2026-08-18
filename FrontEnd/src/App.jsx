import React, { useState, useEffect } from 'react';
import Tables from './pages/Admin/tables&qrcode/Tables&QRCode';
import './App.css';

function App() {
  const [activeTableOrder, setActiveTableOrder] = useState(null);



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
