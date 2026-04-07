import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../api/axiosApi";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

const EditProfile = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    gender: "",
    address: "",
    trainer: "",
    height: "",
    weight: "",
    goal: "",
    targetWeight: "",
    image: ""
  });

  const [trainers, setTrainers] = useState([]);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axiosApi.get("/auth/profile");
        const res2 = await axiosApi.get("/trainers");

        if (res1.data) {
          setForm({
            gender: res1.data.gender || "",
            address: res1.data.address || "",
            trainer: res1.data.trainer || "",
            height: res1.data.height || "",
            weight: res1.data.weight || "",
            goal: res1.data.goal || "",
            targetWeight: res1.data.targetWeight || "",
            image: ""
          });

          setPreview(res1.data.image || "");
        }

        setTrainers(res2.data || []);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        if (form[key]) {
          data.append(key, form[key]);
        }
      });

      await axiosApi.put("/auth/profile", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("Profile Updated ✅");
      navigate("/profile");

    } catch (err) {
      console.log(err);
      toast.error("Update Failed ❌");
    }
  };

  return (
    <div className="bg-[#0b0b0b] text-white min-h-screen pt-32 px-6">

      <div className="max-w-5xl mx-auto">

        {/* 🔥 TOP BAR */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition"
          >
            <FaArrowLeft />
            Back
          </button>

          <h2 className="text-2xl font-bold">
            Edit Profile ✏️
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] p-8 rounded-3xl shadow-lg flex flex-col gap-6"
        >

          {/* 🔥 IMAGE */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={preview || "https://via.placeholder.com/100"}
              className="w-24 h-24 rounded-full object-cover border-2 border-red-500"
              alt="preview"
            />

            <input
              type="file"
              onChange={handleImage}
              className="text-sm"
            />
          </div>

          {/* 🔥 GRID FORM */}
          <div className="grid md:grid-cols-2 gap-5">

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="p-3 bg-[#111] border border-white/20 rounded-lg focus:outline-none focus:border-red-500"
            >
              <option value="" className="bg-black">Gender</option>
              <option className="bg-black">Male</option>
              <option className="bg-black">Female</option>
            </select>

            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="p-3 bg-[#111] border border-white/20 rounded-lg"
            />

            <select
              name="trainer"
              value={form.trainer}
              onChange={handleChange}
              className="p-3 bg-[#111] border border-white/20 rounded-lg"
            >
              <option value="" className="bg-black">Select Trainer</option>

              {trainers.map((t) => (
                <option key={t._id} value={t.name} className="bg-black">
                  {t.name} ({t.specialization})
                </option>
              ))}
            </select>

            <input
              name="height"
              value={form.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              className="p-3 bg-[#111] border border-white/20 rounded-lg"
            />

            <input
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              className="p-3 bg-[#111] border border-white/20 rounded-lg"
            />

            <input
              name="goal"
              value={form.goal}
              onChange={handleChange}
              placeholder="Goal"
              className="p-3 bg-[#111] border border-white/20 rounded-lg"
            />

            <input
              name="targetWeight"
              value={form.targetWeight}
              onChange={handleChange}
              placeholder="Target Weight"
              className="p-3 bg-[#111] border border-white/20 rounded-lg"
            />

          </div>

          {/* 🔥 BUTTON */}
          <button className="bg-red-500 py-3 rounded-xl hover:bg-red-600 transition text-lg font-semibold">
            Save Profile 🚀
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProfile;