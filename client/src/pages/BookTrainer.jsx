import React, { useEffect, useState } from "react";
import axiosApi from "../api/axiosApi";
import toast from "react-hot-toast";


const BookTrainer = () => {

  const [form, setForm] = useState({
    trainer: "",
    date: "",
    time: ""
  });

  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axiosApi.get("/trainers");
      setTrainers(res.data);
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosApi.post("/booking", form);
      toast.success("Booking Sent ✅");
    } catch {
      toast.error("Error ❌");
    }
  };

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen py-24 px-6">

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-[#1a1a1a] p-8 rounded-xl flex flex-col gap-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Book Trainer 🏋️
        </h2>

        <select name="trainer" onChange={handleChange} className="p-3 bg-black">
          <option>Select Trainer</option>
          {trainers.map(t => (
            <option key={t._id} value={t.name}>
              {t.name} ({t.specialization})
            </option>
          ))}
        </select>

        <input type="date" name="date" onChange={handleChange} className="p-3 bg-black" />
        <input type="time" name="time" onChange={handleChange} className="p-3 bg-black" />

        <button className="bg-red-500 py-3">
          Book Now 🚀
        </button>

      </form>

    </div>
  );
};

export default BookTrainer;