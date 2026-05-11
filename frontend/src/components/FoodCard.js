
import React from "react";

function FoodCard({ item, cart, setCart }) {
  const add = () => {
    setCart(prev => {
      const qty = prev[item._id] ? prev[item._id].quantity + 1 : 1;
      return { ...prev, [item._id]: { ...item, quantity: qty } };
    });
  };

  const remove = () => {
    setCart(prev => {
      if (!prev[item._id]) return prev;
      const qty = prev[item._id].quantity - 1;

      if (qty <= 0) {
        const temp = { ...prev };
        delete temp[item._id];
        return temp;
      }

      return { ...prev, [item._id]: { ...item, quantity: qty } };
    });
  };

  return (
    <div className="card">
      <img src={item.image} alt="" />
      <div className="content">
        <h3>{item.name}</h3>
        <p>{item.restaurantId?.name}</p>
        <p>₹{item.price}</p>
        <p>{item.desc}</p>

        <div className="qty">
          <button onClick={remove}>-</button>
          <span>{cart[item._id]?.quantity || 0}</span>
          <button onClick={add}>+</button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;