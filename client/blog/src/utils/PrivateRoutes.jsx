import { Route, Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const PrivateRoutes = () => {
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:7001/auth", {
        withCredentials: true,
      });

      if (res.status === 200) {
        setUser(true);
      } else {
        setUser(false);
        console.log("Authentication failed:", res.data.message);
      }
    } catch (err) {
      setUser(false);
      console.error("Error during authentication:", err);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (user === null) {
    return null;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
