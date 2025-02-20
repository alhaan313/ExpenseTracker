import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Tracker from "./components/Tracker";
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));

  useEffect(() => {
    setIsAuthenticated(!!user); // Update state when user changes
  }, [user]);

  return (
    <Routes> 
      {user ? (
        <>
          <Route path="/" element={<Tracker />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
  
};

export default App;
