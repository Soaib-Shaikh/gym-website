import React, { useEffect, useState } from "react";
import axiosApi from "../../api/axiosApi.js";

const Users = () => {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axiosApi.get("/admin/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axiosApi.delete(`/admin/user/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>

      {/* 🔥 HEADER */}
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Users Management 👥
      </h1>

      {/* 🔥 TABLE */}
      <div className="bg-[#111] rounded-2xl shadow-lg overflow-hidden border border-white/10">

        <table className="w-full text-left">

          {/* HEADER */}
          <thead className="bg-[#1a1a1a] text-gray-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            {users.length > 0 ? (
              users.map((u, i) => (
                <tr
                  key={u._id}
                  className="border-t border-white/10 hover:bg-[#1f1f1f] transition"
                >

                  {/* NAME */}
                  <td className="px-6 py-4 font-medium">
                    {u.name}
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 text-gray-400">
                    {u.email}
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition shadow-md"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No Users Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Users;