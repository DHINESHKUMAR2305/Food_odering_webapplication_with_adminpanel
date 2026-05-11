import React, { useEffect, useState } from "react";
import "../styles/AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const [emailFilter, setEmailFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.reverse()));
  }, []);

  const clearFilters = () => {
    setEmailFilter("");
    setPhoneFilter("");
    setPriceFilter("");
    setDateFilter("");
  };

  const filtered = orders.filter((o) => {
    const email = o.userEmail || "";
    const phone = o.form?.phone || "";
    const total = o.total || 0;
    const date = o.date || "";

    const matchEmail = emailFilter
      ? email.toLowerCase().includes(emailFilter.toLowerCase())
      : true;

    const matchPhone = phoneFilter
      ? phone.includes(phoneFilter)
      : true;

    const matchPrice = priceFilter
      ? total.toString().includes(priceFilter)
      : true;

    const matchDate = dateFilter
      ? date.toLowerCase().includes(dateFilter.toLowerCase())
      : true;

    return matchEmail && matchPhone && matchPrice && matchDate;
  });

  return (
    <div className="admin-orders">
      <h2>All Orders</h2>

      <div className="filter-box">
        <input
          placeholder="Filter by Email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />

        <input
          placeholder="Filter by Mobile"
          value={phoneFilter}
          onChange={(e) => setPhoneFilter(e.target.value)}
        />

        <input
          placeholder="Filter by Price"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />

        <input
          placeholder="Filter by Date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <button className="clear-btn" onClick={clearFilters}>
          Clear
        </button>
      </div>

      {filtered.map((o) => (
        <div className="order-card" key={o._id}>
          <p><b>User:</b> {o.userEmail}</p>
          <p><b>Type:</b> {o.orderType}</p>
          <p><b>Total:</b> ₹{o.total}</p>
          <p><b>Date:</b> {o.date}</p>

          {o.orderType === "delivery" && (
            <>
              <p><b>Name:</b> {o.form?.name}</p>
              <p><b>Phone:</b> {o.form?.phone}</p>
              <p><b>Address:</b> {o.form?.address}</p>
            </>
          )}

          {o.orderType === "dinein" && (
            <p><b>Table No:</b> {o.form?.tableNo}</p>
          )}

          {o.items?.map((item, i) => (
            <p key={i}>
              {item.name} × {item.quantity} = ₹{item.price * item.quantity}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;