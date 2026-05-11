import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const register = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("Fill all fields");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === form.email);
    if (exists) {
      toast.error("User already exists");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("Register Success");

    navigate("/login");
  };

  return (
    <div className="fo-register">
      <h2>Register</h2>

      <input
        className="fo-input"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        className="fo-input"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        className="fo-input"
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button className="fo-btn" onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Register;