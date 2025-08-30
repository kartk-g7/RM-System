import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (err) {
      alert("Error logging out: " + err.message);
    }
  };

  return (
    <button onClick={handleLogout} style={{ marginTop: 20 }}>
      Logout
    </button>
  );
}
