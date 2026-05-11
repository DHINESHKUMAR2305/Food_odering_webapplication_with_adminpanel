import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Admin Panel</h2>

      <div className="admin-btns">
        <button onClick={() => navigate("/admin-dishes")}>
          Our Dishes
        </button>

        <button onClick={() => navigate("/admin-orders")}>
          Our Orders
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;