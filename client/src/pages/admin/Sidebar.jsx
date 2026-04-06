import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] p-6 flex flex-col justify-between border-r border-red-500/20">

      <div>
        <h2 className="text-2xl font-bold mb-10 text-red-500">
          Admin 👑
        </h2>

        <ul className="space-y-2 text-sm">

          <NavLink to="/admin/dashboard"
            className={({isActive}) =>
              `block px-4 py-3 rounded-xl cursor-pointer transition
              ${isActive ? "bg-red-500 shadow-lg" : "hover:bg-[#222] hover:pl-6"}`
            }>
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/users"
            className={({isActive}) =>
              `block px-4 py-3 rounded-xl cursor-pointer
              ${isActive ? "bg-red-500" : "hover:bg-[#222] hover:pl-6"}`
            }>
            👥 Users
          </NavLink>

          {/* TRAINER */}
          <li>
            <div onClick={() => toggleMenu("trainer")}
              className="flex justify-between px-4 py-3 cursor-pointer hover:bg-[#222] rounded-xl">
              🏋️ Trainers
              <span className={`${openMenu==="trainer"?"rotate-90":""}`}>▶</span>
            </div>

            {openMenu==="trainer" && (
              <div className="ml-5 space-y-2 mt-2">
                <NavLink to="/admin/trainers/add" className="block px-3 py-2 hover:bg-[#222] rounded">
                  ➕ Add
                </NavLink>
                <NavLink to="/admin/trainers/view" className="block px-3 py-2 hover:bg-[#222] rounded">
                  👀 View
                </NavLink>
              </div>
            )}
          </li>

          {/* PAYMENT */}
          <li>
            <div onClick={() => toggleMenu("payment")}
              className="flex justify-between px-4 py-3 cursor-pointer hover:bg-[#222] rounded-xl">
              💳 Payments
              <span className={`${openMenu==="payment"?"rotate-90":""}`}>▶</span>
            </div>

            {openMenu==="payment" && (
              <div className="ml-5 space-y-2 mt-2">
                <NavLink to="/admin/payments/pending" className="block px-3 py-2 hover:bg-[#222] rounded">
                  ⏳ Pending
                </NavLink>
                <NavLink to="/admin/payments/completed" className="block px-3 py-2 hover:bg-[#222] rounded">
                  ✅ Completed
                </NavLink>
              </div>
            )}
          </li>

          <NavLink to="/admin/contacts"
            className={({isActive}) =>
              `block px-4 py-3 rounded-xl cursor-pointer
              ${isActive ? "bg-red-500" : "hover:bg-[#222] hover:pl-6"}`
            }>
            📞 Contacts
          </NavLink>

        </ul>
      </div>

      <div className="bg-[#111] p-4 rounded-xl text-center border border-red-500/20">
        <p>{JSON.parse(localStorage.getItem("user"))?.name}</p>
        <p className="text-xs text-red-400">
          {JSON.parse(localStorage.getItem("user"))?.role}
        </p>
      </div>

    </div>
  );
};

export default Sidebar;