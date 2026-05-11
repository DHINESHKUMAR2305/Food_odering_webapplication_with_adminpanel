import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/AdminLogin.css";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = () => {
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    if (form.email === "admin@gmail.com" && form.password === "1234") {
      
      localStorage.setItem(
        "admin",
        JSON.stringify({ email: form.email })
      );

      toast.success("Admin Login Success");

      window.dispatchEvent(new Event("storage"));

      navigate("/admin-dashboard");

    } else {
      toast.error("Invalid Admin Credentials");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;