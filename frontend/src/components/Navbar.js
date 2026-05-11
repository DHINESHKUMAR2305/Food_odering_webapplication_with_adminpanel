import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar({ cart }) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setAdmin(JSON.parse(localStorage.getItem("admin")));
  }, []);

  useEffect(() => {
    const updateNavbar = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
      setAdmin(JSON.parse(localStorage.getItem("admin")));
    };

    window.addEventListener("storage", updateNavbar);

    return () => {
      window.removeEventListener("storage", updateNavbar);
    };
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    setUser(null);

    toast.success("Logout successful");

    window.dispatchEvent(new Event("storage"));

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("admin");

    setAdmin(null);

    toast.success("Admin Logout");

    window.dispatchEvent(new Event("storage"));

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="fo-navbar">
      <h2>Hotel Foodie</h2>

      <div className="fo-nav-links">

        {admin ? (
          <>
            <Link to="/admin-dashboard">Dashboard</Link>
            <button className="fo-logout" onClick={logoutAdmin}>
              Admin Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/cart">Cart ({Object.keys(cart).length})</Link>

            {user ? (
              <>
                <button className="fo-logout" onClick={logoutUser}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/admin">Admin</Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;