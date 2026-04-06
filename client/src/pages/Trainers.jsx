import React, { useEffect, useState } from "react";
import axiosApi from "../api/axiosApi";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = async () => {
    try {
      const res = await axiosApi.get("/trainers");
      setTrainers(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrainers();

    const interval = setInterval(() => {
      fetchTrainers();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111] text-white min-h-screen py-20 px-8">

      <h2 className="text-4xl font-bold text-center mb-12">
        Meet Our Trainers 🏋️
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading trainers...</p>
      ) : trainers.length === 0 ? (
        <p className="text-center text-gray-400">No trainers found</p>
      ) : (
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

          {trainers.map((t) => (
            <div
              key={t._id}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >

              <img
                src={t.image}
                alt={t.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{t.name}</h3>
                <p className="text-gray-400 text-sm">{t.specialization}</p>
                
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Trainers;