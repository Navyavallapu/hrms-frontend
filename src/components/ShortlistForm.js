import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";

const ShortlistForm = () => {
  const [formData, setFormData] = useState({
    candidate_name: "",
    status: "shortlisted",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📤 Sending data to API:", API.submitShortlist);
    console.log("📦 Payload:", formData);

    try {
      const response = await axios.post(API.submitShortlist, formData);
      console.log("✅ Response:", response.data);

      alert("Shortlist submitted successfully!");
      setFormData({
        candidate_name: "",
        status: "shortlisted",
      });
    } catch (error) {
      console.error("❌ Submission failed:", error.response?.data || error.message);
      alert("Submission failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="candidate_name"
          placeholder="Candidate Name"
          value={formData.candidate_name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
        >
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Submit Status
        </button>
      </form>
    </div>
  );
};

export default ShortlistForm;
