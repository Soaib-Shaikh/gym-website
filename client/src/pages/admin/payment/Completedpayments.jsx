import React, { useEffect, useState } from "react";
import axiosApi from "../../../api/axiosApi";

const CompletedPayments = () => {

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosApi.get("/payment").then(res => {
      setPayments(res.data.filter(p => p.status === "success"));
    });
  }, []);

  return (
    <div>

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Completed Payments ✅
      </h1>

      {/* 🔥 EMPTY STATE */}
      {payments.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No Completed Payments 😌</p>
        </div>
      ) : (

        <div className="bg-[#111] rounded-2xl border border-white/10 shadow-lg overflow-hidden">

          <table className="w-full text-left">

            {/* HEADER */}
            <thead className="bg-[#1a1a1a] text-gray-400 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-white/10 hover:bg-[#1f1f1f] transition"
                >
                  <td className="px-6 py-4">
                    {p.user?.name || "Unknown"}
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    ₹{p.amount}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                      Success
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default CompletedPayments;