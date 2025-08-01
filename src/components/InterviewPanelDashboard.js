// InterviewPanelDashboard.js
import React, { useState, useRef, useEffect } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import logo from '../assets/logo.png';
import AssignForm from "./AssignForm";
import ScheduleForm from './ScheduleForm';
import FeedbackForm from './FeedbackForm';
import ShortlistForm from './ShortlistForm';
import Dashboard from './Dashboard';
import { API } from '../api';
import axios from 'axios';

const InterviewPanelDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const menuRef = useRef(null);

  const [counts, setCounts] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    shortlisted: 0,
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardData();
    }
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
      const scheduleRes = await axios.get(API.getSchedules);
      const shortlistRes = await axios.get(API.getShortlist);

      const schedules = scheduleRes.data || [];
      const shortlistedList = shortlistRes.data || [];

      const total = schedules.length;
      const completed = schedules.filter(s => s.status?.toLowerCase() === 'completed').length;
      const pending = schedules.filter(s => s.status?.toLowerCase() === 'pending').length;

      const shortlisted = shortlistedList.filter(
        item => item.status?.toLowerCase() === 'shortlisted'
      ).length;

      setCounts({ total, completed, pending, shortlisted });
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    }
  };

  const tabClass = (tabName) =>
    `px-6 md:px-20 py-3 rounded-md transition ${
      activeTab === tabName
        ? 'bg-blue-600 text-white'
        : 'bg-white dark:bg-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
    }`;

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="fixed inset-0 overflow-y-auto w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6 text-black dark:text-white transition duration-300">

        {/* Header */}
        <header className="relative flex items-center justify-between mb-12">
          <div className="relative z-20" ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl hover:scale-110">
              <Menu />
            </button>
            {menuOpen && (
              <div className="absolute mt-2 bg-white dark:bg-gray-700 shadow rounded-md w-48 p-2 space-y-2 z-50">
                {['schedule', 'assign', 'feedback', 'shortlist'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className="w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-600 rounded capitalize">
                    {tab}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="absolute top--1 left-10">
            <img src={logo} alt="Logo" className="w-auto h-14" />
          </div>

          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-blue-900 dark:text-white">
            HRMS Interview Panel
          </h1>

          <div className="flex items-center gap-6">
            <button>🔔</button>
            <button>⚙️</button>
            <button onClick={() => setDarkMode(!darkMode)} className="border rounded-full p-1">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="bg-blue-300 text-white px-3 py-1 rounded-full">HR</div>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="bg-white dark:bg-gray-700 shadow rounded-lg p-3 mb-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button onClick={() => setActiveTab('dashboard')} className={tabClass('dashboard')}>Dashboard</button>
            <button onClick={() => setActiveTab('schedule')} className={tabClass('schedule')}>Schedule</button>
            <button onClick={() => setActiveTab('assign')} className={tabClass('assign')}>Assign</button>
            <button onClick={() => setActiveTab('feedback')} className={tabClass('feedback')}>Feedback</button>
            <button onClick={() => setActiveTab('shortlist')} className={tabClass('shortlist')}>Shortlist</button>
          </div>
        </nav>

        {/* Watermark */}
        <img
          src={require('../assets/logo.png')}
          alt="Watermark"
          className="absolute opacity-20 w-1/2 mx-auto left-0 right-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
          style={{ filter: 'grayscale(10%)' }}
        />

        {/* Forms */}
        {activeTab === 'dashboard' && <Dashboard stats={counts} />}
        {activeTab === 'schedule' && <ScheduleForm onSuccess={fetchDashboardData} />}
        {activeTab === 'assign' && <AssignForm onSuccess={fetchDashboardData} />}
        {activeTab === 'feedback' && <FeedbackForm onSuccess={fetchDashboardData} />}
        {activeTab === 'shortlist' && <ShortlistForm onSuccess={fetchDashboardData} />}

      </div>
    </div>
  );
};

export default InterviewPanelDashboard;
