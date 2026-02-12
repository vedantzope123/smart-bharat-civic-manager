import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Complaints API
export const complaintAPI = {
  create: (data: any) => api.post('/complaints', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: (params?: any) => api.get('/complaints', { params }),
  getById: (id: string) => api.get(`/complaints/${id}`),
  updateStatus: (id: string, status: string) => api.patch(`/complaints/${id}/status`, { status }),
  addComment: (id: string, comment: any) => api.post(`/complaints/${id}/comments`, comment),
  delete: (id: string) => api.delete(`/complaints/${id}`)
};

// Events API
export const eventAPI = {
  create: (data: any) => api.post('/events', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: (params?: any) => api.get('/events', { params }),
  getById: (id: string) => api.get(`/events/${id}`),
  register: (id: string, userId: string) => api.post(`/events/${id}/register`, { userId }),
  unregister: (id: string, userId: string) => api.post(`/events/${id}/unregister`, { userId }),
  update: (id: string, data: any) => api.put(`/events/${id}`, data),
  delete: (id: string) => api.delete(`/events/${id}`)
};

// Amenities API
export const amenityAPI = {
  create: (data: any) => api.post('/amenities', data),
  getAll: (params?: any) => api.get('/amenities', { params }),
  getById: (id: string) => api.get(`/amenities/${id}`),
  addReview: (id: string, review: any) => api.post(`/amenities/${id}/reviews`, review),
  update: (id: string, data: any) => api.put(`/amenities/${id}`, data),
  delete: (id: string) => api.delete(`/amenities/${id}`)
};

// Users API
export const userAPI = {
  register: (data: any) => api.post('/users/register', data),
  login: (credentials: any) => api.post('/users/login', credentials),
  getProfile: (id: string) => api.get(`/users/${id}`),
  update: (id: string, data: any) => api.put(`/users/${id}`, data)
};

// Bills API
export const billAPI = {
  create: (data: any) => api.post('/bills', data),
  getUserBills: (userId: string) => api.get(`/bills/user/${userId}`),
  pay: (id: string, paymentData: any) => api.post(`/bills/${id}/pay`, paymentData)
};

// WhatsApp API
export const whatsappAPI = {
  send: (data: any) => api.post('/whatsapp/send', data),
  sendBulk: (data: any) => api.post('/whatsapp/send-bulk', data)
};

export default api;
