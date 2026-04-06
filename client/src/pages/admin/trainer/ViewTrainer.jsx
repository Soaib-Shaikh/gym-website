import React, { useEffect, useState } from "react";
import axiosApi from "../../../api/axiosApi";

const ViewTrainer = () => {

  const [trainers, setTrainers] = useState([]);

  const fetch = async () => {
    const res = await axiosApi.get("/trainers");
    setTrainers(res.data);
  };

  const remove = async (id) => {
    await axiosApi.delete(`/trainer/${id}`);
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>

      {/* 🔥 TITLE */}
      <h1 className="text-3xl font-bold text-red-500 mb-6">
        Trainers 👀
      </h1>

      {/* 🔥 EMPTY STATE */}
      {trainers.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">No Trainers Found 😢</p>
          <p className="text-sm mt-2">
            Add a trainer to see them here
          </p>
        </div>
      ) : (

        <div className="grid md:grid-cols-3 gap-6">

          {trainers.map((t) => (
            <div
              key={t._id}
              className="bg-[#111] p-4 rounded-2xl border border-white/10 shadow-lg hover:shadow-red-500/20 transition"
            >

              {/* IMAGE */}
              <img
                src={t.image}
                alt="trainer"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* INFO */}
              <h3 className="text-lg font-bold">{t.name}</h3>
              <p className="text-gray-400 text-sm mb-3">
                {t.specialization}
              </p>

              {/* BUTTON */}
              <button
                onClick={() => remove(t._id)}
                className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg text-sm font-semibold transition"
              >
                Delete ❌
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default ViewTrainer;