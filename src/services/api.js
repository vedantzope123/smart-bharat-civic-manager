import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Complaints API
export const complaintAPI = {
  create: (data) => api.post('/complaints', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: (params) => api.get('/complaints', { params }),
  getById: (id) => api.get(`/complaints/${id}`),
  updateStatus: (id, status) => api.patch(`/complaints/${id}/status`, { status }),
  addComment: (id, comment) => api.post(`/complaints/${id}/comments`, comment),
  delete: (id) => api.delete(`/complaints/${id}`)
};

// Events API
export const eventAPI = {
  create: (data) => api.post('/events', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  register: (id, userId) => api.post(`/events/${id}/register`, { userId }),
  unregister: (id, userId) => api.post(`/events/${id}/unregister`, { userId }),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`)
};

// Amenities API
export const amenityAPI = {
  create: (data) => api.post('/amenities', data),
  getAll: (params) => api.get('/amenities', { params }),
  getById: (id) => api.get(`/amenities/${id}`),
  addReview: (id, review) => api.post(`/amenities/${id}/reviews`, review),
  update: (id, data) => api.put(`/amenities/${id}`, data),
  delete: (id) => api.delete(`/amenities/${id}`)
};

// Users API
export const userAPI = {
  register: (data) => api.post('/users/register', data),
  login: (credentials) => api.post('/users/login', credentials),
  getProfile: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data)
};

// Bills API
export const billAPI = {
  create: (data) => api.post('/bills', data),
  getUserBills: (userId) => api.get(`/bills/user/${userId}`),
  pay: (id, paymentData) => api.post(`/bills/${id}/pay`, paymentData)
};

// WhatsApp API
export const whatsappAPI = {
  send: (data) => api.post('/whatsapp/send', data),
  sendBulk: (data) => api.post('/whatsapp/send-bulk', data)
};

export default api;