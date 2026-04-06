import React, { useState } from "react";
import axiosApi from "../../../api/axiosApi";

const AddTrainer = () => {

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    image: ""
  });

  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (file) {
        const data = new FormData();
        data.append("image", file);

        const res = await axiosApi.post("/upload", data);
        imageUrl = res.data.imageUrl;
      }

      await axiosApi.post("/trainer", {
        ...form,
        image: imageUrl
      });

      alert("Trainer Added ✅");

      setForm({ name: "", specialization: "", image: "" });
      setFile(null);

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  return (
    <div className="max-w-xl mx-auto">

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Add Trainer 🏋️
      </h1>

      {/* 🔥 FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] p-6 rounded-2xl border border-white/10 shadow-lg space-y-5"
      >

        {/* NAME */}
        <input
          placeholder="Trainer Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded-lg outline-none focus:border-red-500"
        />

        {/* SPECIALIZATION */}
        <input
          placeholder="Specialization (e.g. Cardio, Strength)"
          value={form.specialization}
          onChange={(e) =>
            setForm({ ...form, specialization: e.target.value })
          }
          className="w-full p-3 bg-[#0f0f0f] border border-gray-700 rounded-lg outline-none focus:border-red-500"
        />

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm text-gray-400"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-lg font-semibold transition"
        >
          Add Trainer 🚀
        </button>

      </form>

    </div>
  );
};

export default AddTrainer;