// InterviewPanelDashboard.js
import React, { useState, useRef, useEffect } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import logo from '../assets/logo.png'; // corrected path
import AssignForm from "./AssignForm";
import ScheduleForm from './ScheduleForm';
import FeedbackForm from './FeedbackForm';
import ShortlistForm from './ShortlistForm';

const InterviewPanelDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg text-blue-900 dark:text-blue-200">
              <p>Total Interviews</p>
              <h2 className="text-2xl font-bold">0</h2>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg text-green-800 dark:text-green-200">
              <p>Completed</p>
              <h2 className="text-2xl font-bold">0</h2>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg text-yellow-800 dark:text-yellow-200">
              <p>Pending</p>
              <h2 className="text-2xl font-bold">0</h2>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg text-purple-800 dark:text-purple-200">
              <p>Shortlisted</p>
              <h2 className="text-2xl font-bold">0</h2>
            </div>
          </div>
        )}

        {/* Watermark */}
        <img
          src={require('../assets/logo.png')}
          alt="Watermark"
          className="absolute opacity-20 w-1/2 mx-auto left-0 right-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none"
          style={{ filter: 'grayscale(10%)' }}
        />

        {/* FORMS */}
        {activeTab === 'schedule' && <ScheduleForm />}
        {activeTab === 'assign' && <AssignForm />}
        {activeTab === 'feedback' && <FeedbackForm />}
        {activeTab === 'shortlist' && <ShortlistForm />}
      </div>
    </div>
  );
};

export default InterviewPanelDashboard;
