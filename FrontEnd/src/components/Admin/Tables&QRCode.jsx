import React from 'react';
import { TableSection } from '../../pages/Admin/tables&qrcode/TableSection';

export const Tables = ({ onOpenOrderForm }) => {
    return (
        <>
            <TableSection onOpenOrderForm={onOpenOrderForm} />
        </>
    );
};

export default Tables;