import { request } from './api.js';

export const userService = {
  getUsers: async () => {
    const res = await request('/users');
    return res.data;
  },

  createUser: async (userData) => {
    const res = await request('/users', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    return res.data;
  },

  updateUser: async (id, userData) => {
    const res = await request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await request(`/users/${id}`, {
      method: 'DELETE'
    });
    return res.data;
  }
};
