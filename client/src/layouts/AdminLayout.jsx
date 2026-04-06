import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/admin/Sidebar";


const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-black text-white">

      <Sidebar />

      <div className="flex-1 p-10">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;