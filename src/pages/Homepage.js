// src/pages/Homepage.js
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Navbar */}
      <div className="w-full bg-black bg-opacity-60 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Restaurant System</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
          <Link to="/login" className="hover:text-yellow-300">
            Login
          </Link>
          <Link to="/signup" className="hover:text-yellow-300">
            Signup
          </Link>
        </div>
      </div>

      {/* Centered Welcome Box */}
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-black bg-opacity-60 p-10 rounded-lg text-center text-white shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Restaurant</h2>
          <p className="text-lg">
            Manage stock, suppliers, and logs with ease 🚀
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
