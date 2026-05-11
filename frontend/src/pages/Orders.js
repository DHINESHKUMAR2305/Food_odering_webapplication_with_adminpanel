import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.email) return;

    const key = `orders_${user.email}`;
    const data = JSON.parse(localStorage.getItem(key)) || [];

    setOrders(data.reverse()); 
  }, []);

  return (
    <div className="fo-orders">
      <h2 className="fo-title">📦 My Orders</h2>

      {orders.length === 0 ? (
        <h3 className="yyy">No orders yet</h3>
      ) : (
        orders.map((order) => (
          <div className="fo-order-card" key={order.id}>
            <div className="fo-order-header">
              <h3>{order.orderType.toUpperCase()}</h3>
              <p className="fo-total">₹{order.total}</p>
            </div>

            <p className="fo-date">{order.date}</p>

            <div className="fo-items">
              {order.items.map((item) => (
                <div className="fo-item-row" key={item._id}>
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;