// src/pages/ClientPage.js
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ClientDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, Client!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ClientDashboard;
