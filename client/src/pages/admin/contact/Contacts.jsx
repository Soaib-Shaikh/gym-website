import React, { useEffect, useState } from "react";
import axiosApi from "../../../api/axiosApi";

const Contacts = () => {

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axiosApi.get("/contact")
      .then(res => setContacts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Contact Messages 📞
      </h1>

      {/* 🔥 EMPTY STATE */}
      {contacts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No Messages Yet 😌</p>
          <p className="text-sm mt-2">
            User messages will appear here
          </p>
        </div>
      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-red-500/20 transition"
            >

              {/* NAME */}
              <h2 className="text-lg font-bold mb-2">
                {c.name}
              </h2>

              {/* EMAIL */}
              <p className="text-gray-400 text-sm mb-3">
                {c.email}
              </p>

              {/* MESSAGE */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {c.message}
              </p>

              {/* DATE (optional agar backend me hai) */}
              {c.createdAt && (
                <p className="text-xs text-gray-500 mt-4">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Contacts;