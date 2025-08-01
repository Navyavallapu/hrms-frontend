import React, { useState } from "react";
import axios from "axios";
import { API } from "../api";

const AssignForm = () => {
  const [formData, setFormData] = useState({
    candidate_name: "",
    interviewer_name: "",
    
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
      console.log("Form Data:", formData);
      await axios.post(API.assignInterview, formData);

      alert("Interview assigned successfully!");
      setFormData({
        candidate_name: "",
        interviewer_name: "",
       
      });
    } catch (error) {
      console.error("Error assigning interview:", error);
      alert("Failed to assign interview.");
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
          name="interviewer_name"
          placeholder="Interviewer Name"
          value={formData.interviewer_name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
        
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Assign Interview
        </button>
      </form>
    </div>
  );
};

export default AssignForm;
