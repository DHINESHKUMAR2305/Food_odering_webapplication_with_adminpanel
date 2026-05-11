import React, { useEffect, useState } from "react";
import { getCart, saveCart } from "../utils/cart";
import "./Home.css";
import { toast } from "react-toastify";


function Home({ setCart }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  const add = (item) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("please login Login");
      return;
    }

    let cart = getCart();

    cart[item._id] = cart[item._id]
      ? { ...cart[item._id], quantity: cart[item._id].quantity + 1 }
      : {
          _id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,   
          quantity: 1
        };

    saveCart(cart);
    setCart(cart);
  };

  const remove = (item) => {
    let cart = getCart();

    if (!cart[item._id]) return;

    cart[item._id].quantity -= 1;

    if (cart[item._id].quantity <= 0) {
      delete cart[item._id];
    }

    saveCart(cart);
    setCart(cart);
  };

  return (
    <div className="fo-home">
      <h2 className="fo-title">🍽 Food Items</h2>

      <div className="fo-grid">
        {foods.map((item) => (
          <div className="fo-card" key={item._id}>

            <img
              src={item.image}
              alt={item.name}
              className="fo-image"
            />

            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <div className="fo-counter">
              <button onClick={() => remove(item)}>-</button>

              <span>{getCart()[item._id]?.quantity || 0}</span>

              <button onClick={() => add(item)}>+</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;