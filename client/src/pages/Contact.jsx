import React, { useState } from "react";
import axiosApi from "../api/axiosApi";
import toast from "react-hot-toast";

const Contact = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Login required 🔐");
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);

      const res = await axiosApi.post("/contact/send", form);

      if (res.status === 201 || res.status === 200) {
        toast.success("Message Sent ✅");

        setForm({
          name: "",
          email: "",
          message: ""
        });
      }

    } catch (err) {
      console.log(err);
      toast.error("Error sending message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f0f0f] text-white py-24 px-6 min-h-screen">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Contact Us 📞
          </h2>

          <p className="text-gray-400 mb-6">
            Have questions or need help? Reach out to us and start your fitness journey today.
          </p>

          <p className="text-gray-300 mb-2">📍 Navsari, Gujarat, India</p>
          <p className="text-gray-300 mb-2">📧 samshaikh1192@gmail.com</p>
          <p className="text-gray-300">📞 +91 7046337596</p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] p-8 rounded-2xl shadow-lg flex flex-col gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 bg-transparent border border-gray-600 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 bg-transparent border border-gray-600 outline-none"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
            className="p-3 bg-transparent border border-gray-600 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 py-3 font-semibold hover:bg-red-600 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message 🚀"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Contact;