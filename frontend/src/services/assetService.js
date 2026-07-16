import { request } from './api.js';

export const assetService = {
    getAll: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const res = await request(`/assets?${query}`);
        
        return res.data;
    },

    getById: async (id) => {
        const res = await request(`/assets/${id}`);
        
        return res.data;
    },

    create: async (assetData) => {
        const res = await request('/assets', {
            method: 'POST',
            body: JSON.stringify(assetData)
        });
        
        return res.data;
    },

    update: async (id, assetData) => {
        const res = await request(`/assets/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(assetData)
        });
        
        return res.data;
    },

    retire: async (id) => {
        const res = await request(`/assets/${id}`, {
            method: 'DELETE'
        });
        
        return res.data;
    },

    getPublicBySlug: async (slug) => {
        const res = await request(`/assets/public/${slug}`);
        
        return res.data;
    },

    getPublicByCode: async (code) => {
        const res = await request(`/assets/public/code/${code}`);
        
        return res.data;
    },

    getHistory: async (id) => {
        const res = await request(`/assets/${id}/history`);
        
        return res.data;
    }
};
