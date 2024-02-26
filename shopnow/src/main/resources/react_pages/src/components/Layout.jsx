import React, { createContext, useContext, useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router";

export const cartContext = createContext();

function Layout() {
  const [cartValue, setCartValue] = useState(0);
  useEffect(() => {
    async function check() {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/user/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify("aoskdsodik"),
      });
      console.log(response);
      if (!response.ok) {
        window.location.replace("/auth");
        return;
      }
    }
    async function cartUpdate() {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/products/cartsize",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        window.location.replace("/auth");
        return;
      }
      const data = await response.json();
      setCartValue(data.CartSize);
    }
    cartUpdate();
  }, []);

  return (
    <cartContext.Provider value={{ cartValue, setCartValue }}>
      <Navbar />
      <Outlet />
    </cartContext.Provider>
  );
}

export default Layout;
