// src/pages/admin/AdminLayout.js
import NavBar from "../../Components/admin/NavBar";
import SideBar from "../../Components/admin/SideBar";

function AdminLayout({ children }) {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <NavBar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
