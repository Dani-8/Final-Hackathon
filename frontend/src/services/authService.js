import { request } from './api.js';

export const authService = {
    login: async (email, password) => {
        const res = await request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })

        if (res.success && res.data.token) {
            localStorage.setItem('token', res.data.token)
        }

        return res.data
    },

    register: async (name, email, password, role, specialty) => {
        const res = await request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, role, specialty })
        })

        if (res.success && res.data.token) {
            localStorage.setItem('token', res.data.token)
        }

        return res.data
    },

    getMe: async () => {
        const res = await request('/auth/me')
        return res.data.user;
    },

    logout: () => {
        localStorage.removeItem('token')
    }
}
