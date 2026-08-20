import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/User/LandingPage';
import LandingPage from './pages/User/LandingPage';

// Lazy loading admin layout and page components
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const Tables = lazy(() => import('./pages/Admin/tables&qrcode/Tables&QRCode'));
const Products = lazy(() => import('./pages/Admin/Products'));
const Login = lazy(() => import('./pages/Login'));
const Waiters = lazy(() => import('./pages/Admin/Waiters'))

// Loading spinner fallback for lazy components
const PageLoading = () => (
  <div className="flex min-h-screen w-full items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#FF6200] border-t-transparent shadow-lg shadow-[#FF6200]/20" />
      <span className="text-xs font-medium tracking-wider text-[#8A929B] uppercase">Loading...</span>
    </div>
  </div>
);

// Placeholder component for routes under development
const PagePlaceholder = ({ title }) => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-[#1F2736] bg-[#131822] p-8 text-center shadow-lg">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#FF6200]/20 bg-[#FF6200]/10 text-[#FF6200] mb-4">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-[#E2E2E9]">{title}</h2>
    <p className="mt-2 max-w-sm text-sm text-[#8A929B]">
      The {title} dashboard is currently under active development.
    </p>
  </div>
);

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Common Admin Layout with persistent Navbar & Sidebar, rendering content via <Outlet /> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/tables" replace />} />
          <Route path="tables" element={<Tables />} />
          <Route path="products" element={<Products />} />
          <Route path="overview" element={<PagePlaceholder title="Overview" />} />
          <Route path="orders" element={<PagePlaceholder title="Orders" />} />
          <Route path="offers" element={<PagePlaceholder title="Offers" />} />
          <Route path="specials" element={<PagePlaceholder title="Today's Specials" />} />
          <Route path="waiters" element={<Waiters />} />
          <Route path="help-requests" element={<PagePlaceholder title="Help Requests" />} />
          <Route path="reports" element={<PagePlaceholder title="Reports" />} />
          <Route path="settings" element={<PagePlaceholder title="Settings" />} />
        </Route>

        {/* Initial route and fallback redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
    // <LandingPage/>
  );
}

export default App;