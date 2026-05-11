import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = () => {
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password
    );

    if (!validUser) {
      toast.error("Invalid email or password ❌");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ email: validUser.email })
    );

    toast.success("Login Success ✅");

    window.dispatchEvent(new Event("storage"));

    navigate("/");
  };

  return (
    <div className="fo-login">
      <h2>Login</h2>

      <input
        className="fo-input"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="fo-input"
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="fo-btn" onClick={login}>
        Login
      </button>
    </div>
  );
}

export default Login;