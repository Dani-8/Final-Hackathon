import { apiResponse } from '../utils/apiResponse.js';

const rateLimitMap = new Map();

export function rateLimiter({ windowMs = 60 * 1000, max = 30, message = 'Too many requests, please try again later.' } = {}) {
    return (req, res, next) => {
        const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
        const now = Date.now()

        if (!rateLimitMap.has(ip)) {
            rateLimitMap.set(ip, []);
        }

        const requests = rateLimitMap.get(ip)

        // Filter out requests older than windowMs
        const recentRequests = requests.filter(timestamp => now - timestamp < windowMs)

        recentRequests.push(now);
        rateLimitMap.set(ip, recentRequests);

        if (recentRequests.length > max) {
            return apiResponse.error(res, message, 429);
        }

        next()
    }
}

export default rateLimiter
