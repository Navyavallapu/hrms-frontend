import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";

const ScheduleForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    candidate_name: "",
    role: "",
    date: "",
    time: "",
    status: "completed"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API.postSchedule, formData);
      alert("Interview scheduled successfully!");
      setFormData({
        candidate_name: "",
        role: "",
        date: "",
        time: "",
        status: "completed"
      });
      onSuccess?.(); // call fetchDashboardData
    } catch (error) {
      console.error("Error scheduling interview:", error);
      alert("Scheduling failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4 max-w-md mx-auto"
    >
      <input
        type="text"
        name="candidate_name"
        placeholder="Candidate Name"
        value={formData.candidate_name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border rounded-md p-2 mb-4 dark:bg-gray-700 dark:text-white"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Schedule Interview
      </button>
    </form>
  );
};

export default ScheduleForm;
