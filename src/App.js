// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import Stock from "./pages/admin/Stock";
import Suppliers from "./pages/admin/Supplier";
import PurchaseLogs from "./pages/admin/PurchaseLogs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/stock"
          element={
            <ProtectedRoute role="admin">
              <Stock/>
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/suppliers"
          element={
            <ProtectedRoute role="admin">
              <Suppliers/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/purchase-logs"
          element={
            <ProtectedRoute role="admin">
              <PurchaseLogs/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
