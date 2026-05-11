import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../styles/AdminDishes.css";

function AdminDishes() {
  const [foods, setFoods] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: ""
  });

  const [editId, setEditId] = useState(null);

  const loadFoods = () => {
    fetch("http://localhost:5000/api/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const addFood = async () => {
    if (!form.name || !form.price || !form.image) {
      toast.error("Fill all fields");
      return;
    }

    await fetch("http://localhost:5000/api/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    toast.success("Food Added");
    setForm({ name: "", price: "", image: "" });
    loadFoods();
  };

  const deleteFood = async (id) => {
    await fetch(`http://localhost:5000/api/foods/${id}`, {
      method: "DELETE"
    });

    toast.success("Deleted");
    loadFoods();
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({
      name: item.name,
      price: item.price,
      image: item.image
    });
  };

  const updateFood = async () => {
    await fetch(`http://localhost:5000/api/foods/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    toast.success("Updated");
    setEditId(null);
    setForm({ name: "", price: "", image: "" });
    loadFoods();
  };

  return (
    <div className="admin-dishes">
      <h2>Our Dishes</h2>

      <div className="add-box">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
        />

        {editId ? (
          <button onClick={updateFood}>Update</button>
        ) : (
          <button onClick={addFood}>Add Item</button>
        )}
      </div>

      {foods.map((f) => (
        <div className="dish-card" key={f._id}>
          <img src={f.image} alt="" />
          <h4>{f.name}</h4>
          <p>₹{f.price}</p>

          <button onClick={() => startEdit(f)}>Edit</button>
          <button onClick={() => deleteFood(f._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminDishes;