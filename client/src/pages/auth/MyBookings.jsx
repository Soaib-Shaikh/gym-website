import React, { useEffect, useState } from "react";
import axiosApi from "../../api/axiosApi";


const MyBookings = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosApi.get("/booking/my");
      setBookings(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-20">

      <h2 className="text-3xl mb-6">My Bookings 📋</h2>

      {bookings.map(b => (
        <div key={b._id} className="bg-[#111] p-5 mb-4 rounded-lg">

          <h3>{b.trainer}</h3>
          <p>{b.date} - {b.time}</p>

          <p className={
            b.status === "approved"
              ? "text-green-400"
              : b.status === "rejected"
              ? "text-red-400"
              : "text-yellow-400"
          }>
            {b.status}
          </p>

        </div>
      ))}

    </div>
  );
};

export default MyBookings;