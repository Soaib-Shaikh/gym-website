import React, { useEffect, useState } from "react";
import axiosApi from "../../../api/axiosApi";


const AdminBookings = () => {

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axiosApi.get("/booking");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await axiosApi.put(`/booking/${id}`, { status });
    fetchBookings();
  };

  return (
    <div className="bg-black text-white min-h-screen p-10">

      <h2 className="text-3xl mb-6">All Bookings 🛠️</h2>

      {bookings.map(b => (
        <div key={b._id} className="bg-[#111] p-5 mb-4 rounded-lg">

          <h3>{b.user?.name}</h3>
          <p>{b.trainer}</p>
          <p>{b.date} - {b.time}</p>

          <p>Status: {b.status}</p>

          <div className="flex gap-3 mt-3">

            <button
              onClick={() => updateStatus(b._id, "approved")}
              className="bg-green-500 px-4 py-1"
            >
              Approve
            </button>

            <button
              onClick={() => updateStatus(b._id, "rejected")}
              className="bg-red-500 px-4 py-1"
            >
              Reject
            </button>

          </div>

        </div>
      ))}

    </div>
  );
};

export default AdminBookings;