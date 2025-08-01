import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";

const AssignForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    interviewer_name: "",
    candidate_name: "",
    round: ""
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
      await axios.post(API.assignInterview, formData);
      alert("Interview assigned successfully!");
      setFormData({
        interviewer_name: "",
        candidate_name: "",
        round: ""
      });
      onSuccess?.(); // call fetchDashboardData
    } catch (error) {
      console.error("Error assigning interview:", error);
      alert("Assignment failed.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow space-y-4 max-w-md mx-auto"
    >
      <input
        type="text"
        name="interviewer_name"
        placeholder="Interviewer Name"
        value={formData.interviewer_name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
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
        name="round"
        placeholder="Round (e.g., Technical, HR)"
        value={formData.round}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Assign Interview
      </button>
    </form>
  );
};

export default AssignForm;
