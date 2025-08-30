// src/components/admin/Sidebar.js
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-6 space-y-4">
      <h2 className="text-lg font-semibold mb-6">Menu</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/admin/stock" className="hover:bg-gray-700 p-2 rounded">Stock Tracking</Link>
        <Link to="/admin/suppliers" className="hover:bg-gray-700 p-2 rounded">Suppliers</Link>
        <Link to="/admin/purchase-logs" className="hover:bg-gray-700 p-2 rounded">Purchase & Usage Logs</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
