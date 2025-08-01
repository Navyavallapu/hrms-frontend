import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";

const ShortlistForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    candidate_name: "",
    status: "shortlisted"
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
      await axios.post(API.submitShortlist, formData);
      alert("Candidate shortlisted successfully!");
      setFormData({ candidate_name: "", status: "shortlisted" });
      onSuccess?.(); // Refresh dashboard
    } catch (error) {
      console.error("Error shortlisting candidate:", error);
      alert("Shortlisting failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4 max-w-md mx-auto">
      <input
        type="text"
        name="candidate_name"
        placeholder="Candidate Name"
        value={formData.candidate_name}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="shortlisted">Shortlisted</option>
        <option value="rejected">Rejected</option>
      </select>
      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ShortlistForm;
