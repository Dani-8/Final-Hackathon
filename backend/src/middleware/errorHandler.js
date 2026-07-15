import { apiResponse } from '../utils/apiResponse.js';

export function errorHandler(err, req, res, next) {
    console.error('❌ Server Error:', err);

    const status = err.statusCode || err.status || 500;
    const message = err.message || 'An internal server error occurred';
    const errors = err.errors || null;

    return apiResponse.error(res, message, status, errors);
}

export default errorHandler