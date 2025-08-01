import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";

const FeedbackForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    candidate_name: "",
    feedback: ""
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
      await axios.post(API.submitFeedback, formData);
      alert("Feedback submitted successfully!");
      setFormData({ candidate_name: "", feedback: "" });
      onSuccess?.(); // Optional: Refresh dashboard if feedback affects it
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Feedback submission failed.");
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
      <textarea
        name="feedback"
        placeholder="Feedback"
        value={formData.feedback}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
