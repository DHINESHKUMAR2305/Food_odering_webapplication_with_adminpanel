import React, { useEffect, useState } from "react";
import { getCart, saveCart } from "../utils/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart({ setCart }) {
  const [cart, setLocalCart] = useState({});
  const [orderType, setOrderType] = useState("");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    tableNo: ""
  });

  useEffect(() => {
    const data = getCart();
    setLocalCart(data);
    setCart(data);
  }, [setCart]);

  const items = Object.values(cart || {});

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user?.email) {
      toast.error("Please login first");
      return;
    }

    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (!orderType) {
      toast.warning("Please select order type");
      return;
    }

    if (orderType === "delivery") {
      if (!form.name || !form.phone || !form.address) {
        toast.error("Fill all delivery details");
        return;
      }
    }

    if (orderType === "dinein") {
      if (!form.tableNo) {
        toast.error("Enter table number");
        return;
      }
    }

    try {
      await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userEmail: user.email,
          items,
          orderType,
          total,
          form 
        })
      });

      if (orderType === "pickup") {
        toast.success("After 5 minutes you can get your dish 🍽");
      }

      if (orderType === "delivery") {
        toast.success("Our delivery boy will contact you 📞");
      }

      if (orderType === "dinein") {
        toast.success("Our service will confirm your order 🍴");
      }

      localStorage.removeItem("cart");
      saveCart({});
      setCart({});
      setLocalCart({});

      setOrderType("");
      setForm({
        name: "",
        phone: "",
        address: "",
        tableNo: ""
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      toast.error("Order failed");
    }
  };

  return (
    <div className="fo-cart">
      <h2 className="fo-title">🛒 Cart</h2>

      {items.length === 0 ? (
        <h3 className="xxx">Your cart is empty</h3>
      ) : (
        <>
          {items.map((item) => {
            const itemTotal = item.price * item.quantity;

            return (
              <div className="fo-item" key={item._id}>
                <span>{item.name}</span>
                <span>
                  {item.quantity} × ₹{item.price} = ₹{itemTotal}
                </span>
              </div>
            );
          })}

          <div className="fo-total-box">
            <h3>Grand Total: ₹{total}</h3>
          </div>

          <div className="fo-btn-group">
            <button
              className={`fo-btn ${orderType === "pickup" ? "fo-active" : ""}`}
              onClick={() => setOrderType("pickup")}
            >
              Pickup
            </button>

            <button
              className={`fo-btn ${orderType === "delivery" ? "fo-active" : ""}`}
              onClick={() => setOrderType("delivery")}
            >
              Delivery
            </button>

            <button
              className={`fo-btn ${orderType === "dinein" ? "fo-active" : ""}`}
              onClick={() => setOrderType("dinein")}
            >
              Dine In
            </button>
          </div>

          {orderType === "delivery" && (
            <>
              <input className="fo-input" name="name" placeholder="Name" onChange={handleChange}/>
              <input className="fo-input" name="phone" placeholder="Phone" onChange={handleChange}/>
              <textarea className="fo-textarea" name="address" placeholder="Address" onChange={handleChange}/>
            </>
          )}

          {orderType === "dinein" && (
            <input className="fo-input" name="tableNo" placeholder="Table Number" onChange={handleChange}/>
          )}

          <button className="fo-submit" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;