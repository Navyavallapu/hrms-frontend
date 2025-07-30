const BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const API = {
  assignInterview: `${BASE_URL}/api/assign`,
  getSchedules: `${BASE_URL}/api/schedules`,
  postSchedule: `${BASE_URL}/api/schedules`,
  getDashboardStats: `${BASE_URL}/api/dashboard`,
  submitFeedback: `${BASE_URL}/api/feedbacks`,
  submitShortlist: `${BASE_URL}/api/shortlist`,
};
