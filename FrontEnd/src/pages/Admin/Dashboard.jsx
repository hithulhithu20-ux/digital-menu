import React from 'react';
import { Tables } from '../../components/Tables&QRCode';

export const Dashboard = ({ onOpenOrderForm }) => {
  return (
    <>
      <div className='bg-[#0B0E14] min-h-screen'>
        <Tables onOpenOrderForm={onOpenOrderForm} />
      </div>

    </>
  );
};

export default Dashboard;
