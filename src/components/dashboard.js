// frontend/src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ stats = {} }) => {
  const {
    total = 0,
    completed = 0,
    pending = 0,
    shortlisted = 0,
  } = stats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded-lg text-blue-900">
        <p>Total Interviews</p>
        <h2 className="text-2xl font-bold">{total}</h2>
      </div>
      <div className="bg-green-100 p-4 rounded-lg text-green-800">
        <p>Completed</p>
        <h2 className="text-2xl font-bold">{completed}</h2>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg text-yellow-800">
        <p>Pending</p>
        <h2 className="text-2xl font-bold">{pending}</h2>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg text-purple-800">
        <p>Shortlisted</p>
        <h2 className="text-2xl font-bold">{shortlisted}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
