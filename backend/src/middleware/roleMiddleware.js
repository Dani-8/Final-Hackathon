import { apiResponse } from '../utils/apiResponse.js'

export function roleMiddleware(allowedRoles = []) {
    return (req, res, next) => {
        if (!req.user) {
            return apiResponse.error(res, 'Authentication required.', 401);
        }

        if (!allowedRoles.includes(req.user.role)) {
            return apiResponse.error(res, `Access denied. Role '${req.user.role}' is unauthorized to perform this action.`, 403);
        }

        next()
    }
}

export default roleMiddleware
