import React, { useState, useEffect } from 'react';
import Tables from './pages/Admin/tables&qrcode/Tables&QRCode';
import './App.css';

function App() {
  const [activeTableOrder, setActiveTableOrder] = useState(null);



  return (

    <>
      <Tables />
    </>
  )
}


export default App;
