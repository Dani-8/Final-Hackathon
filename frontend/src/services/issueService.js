import { request } from './api.js';

export const issueService = {
    getAll: async (params = {}) => {
        const query = new URLSearchParams(params).toString();
        const res = await request(`/issues?${query}`);
        return res.data;
    },

    getById: async (id) => {
        const res = await request(`/issues/${id}`);
        return res.data;
    },

    createPublic: async (issueData) => {
        const res = await request('/issues/public', {
            method: 'POST',
            body: JSON.stringify(issueData)
        });
        return res.data;
    },

    assign: async (id, technicianId) => {
        const res = await request(`/issues/${id}/assign`, {
            method: 'PATCH',
            body: JSON.stringify({ technicianId })
        });
        return res.data;
    },

    updateStatus: async (id, status) => {
        const res = await request(`/issues/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status })
        });
        return res.data;
    },

    updateChecks: async (id, completedChecks) => {
        const res = await request(`/issues/${id}/checks`, {
            method: 'PATCH',
            body: JSON.stringify({ completedChecks })
        });
        return res.data;
    },

    getPublicStatus: async (issueNumber) => {
        const res = await request(`/issues/public/${issueNumber}/status`);
        return res.data;
    },

    submitMaintenance: async (id, maintenanceData) => {
        const res = await request(`/issues/${id}/maintenance`, {
            method: 'POST',
            body: JSON.stringify(maintenanceData)
        });
        return res.data;
    }
};
