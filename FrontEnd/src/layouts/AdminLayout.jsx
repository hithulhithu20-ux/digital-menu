import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Admin/Sidebar";
import Navbar from "../pages/Admin/Navbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#0C0D12] text-white">
      <Sidebar />
      <Navbar />

      <main className="min-h-screen pl-18 pt-18 lg:pl-62.5">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;