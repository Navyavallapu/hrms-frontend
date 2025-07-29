// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from "../api";
const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    shortlisted: 0
  });

  useEffect(() => {
    axios.get(API.getDashboard)

      .then(res => setStats(res.data))
      .catch(err => console.error('Error fetching dashboard stats:', err));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      <div className="bg-blue-100 p-4 rounded-lg text-blue-900">
        <p>Total Interviews</p>
        <h2 className="text-2xl font-bold">{stats.totalInterviews}</h2>
      </div>
      <div className="bg-green-100 p-4 rounded-lg text-green-800">
        <p>Completed</p>
        <h2 className="text-2xl font-bold">{stats.completed}</h2>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg text-yellow-800">
        <p>Pending</p>
        <h2 className="text-2xl font-bold">{stats.pending}</h2>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg text-purple-800">
        <p>Shortlisted</p>
        <h2 className="text-2xl font-bold">{stats.shortlisted}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
