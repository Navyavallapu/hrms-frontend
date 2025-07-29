import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";
const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    candidate_name: "",
    interviewer: "",
    feedback: "",
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
      setFormData({
        candidate_name: "",
        interviewer: "",
        feedback: "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
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
        <input
          type="text"
          name="interviewer"
          placeholder="Interviewer Name"
          value={formData.interviewer}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        <textarea
          name="feedback"
          placeholder="Write feedback here..."
          value={formData.feedback}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

expor
