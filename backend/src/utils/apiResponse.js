export const apiResponse = {
    success: (res, data = null, message = 'Success', status = 200) => {
        return res.status(status).json({
            success: true,
            message,
            data
        });
    },
    error: (res, message = 'An error occurred', status = 500, errors = null) => {
        return res.status(status).json({
            success: false,
            message,
            errors
        });
    }
};
