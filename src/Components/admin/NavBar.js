// src/components/admin/Navbar.js
import { auth } from "../../firebase"; // make sure the path is correct
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);       // sign out from Firebase
      navigate("/login");        // redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Try again.");
    }
  };

  return (
    <div className="w-full bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
