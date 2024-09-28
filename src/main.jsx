import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { initFlowbite } from "flowbite";

import Home from "./pages/Home";
import Order from "./pages/Order";
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageProducts from './pages/ManageProducts';
import ManageTransactions from './pages/ManageTransactions';


import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/dashboard/reports" element={<AdminDashboard />} />
        <Route path="/dashboard/login" element={<AdminLogin />} />
        <Route path="/dashboard/manage-products" element={<ManageProducts />} />
        <Route path="/dashboard/manage-transactions" element={<ManageTransactions />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
