import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../api";
const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(API.getSchedules);

        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Scheduled Interviews</h2>
      {schedules.length === 0 ? (
        <p className="text-gray-500">No interviews scheduled.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Candidate</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{item.candidate_name}</td>
                <td className="border px-4 py-2">{item.role}</td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScheduleList;
