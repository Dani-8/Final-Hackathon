import { request } from './api.js';

export const categoryService = {
  getAll: async () => {
    const res = await request('/categories');
    return res.data;
  },

  getAllPublic: async () => {
    const res = await request('/categories/public');
    return res.data;
  },

  create: async (name) => {
    const res = await request('/categories', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
    return res.data;
  }
};
