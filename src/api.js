const BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const API = {
  assignInterview: `${BASE_URL}/api/assign`,
  getSchedules: `${BASE_URL}/api/schedules`,         // used for total/completed/pending
  postSchedule: `${BASE_URL}/api/schedules`,
  getShortlist: `${BASE_URL}/api/shortlist`,         // used for shortlisted count
  submitFeedback: `${BASE_URL}/api/feedbacks`,
  submitShortlist: `${BASE_URL}/api/shortlist`
};
