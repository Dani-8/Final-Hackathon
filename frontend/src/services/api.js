const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function request(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    }

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'An error occurred during request execution.');
        }

        return data
    } catch (err) {
        console.error(`API Error on ${endpoint}:`, err.message);
        throw err;
    }
}

// Special upload fetch helper
export async function uploadRequest(endpoint, formData) {
    const token = localStorage.getItem('token')
    const headers = {}

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers,
            body: formData
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Upload failed.');
        }

        return data
    } catch (err) {
        console.error('Upload error:', err.message)

        throw err
    }
}
