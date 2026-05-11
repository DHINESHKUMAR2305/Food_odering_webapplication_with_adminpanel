import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDishes from "./pages/AdminDishes";
import AdminOrders from "./pages/AdminOrders";

import { getCart } from "./utils/cart";

function App() {
  const [cart, setCart] = useState({});

  useEffect(() => {
    setCart(getCart());
  }, []);

  return (
    <>
      <Navbar cart={cart} />

      <Routes>
        <Route path="/" element={<Home setCart={setCart} />} />
        <Route path="/cart" element={<Cart setCart={setCart} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dishes" element={<AdminDishes />} />
        <Route path="/admin-orders" element={<AdminOrders />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;