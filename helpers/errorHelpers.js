let errorHelpers = {
    logErrorsConsole: (err, req, res, next) => {
        console.error("Log Entry: " + JSON.stringify(errorHelpers.errorBuilder(err)));
        console.error("*".repeat(80));
        next(err)
    },
    clientErrorHandler: (err, req, res, next) => {
        if (rea.xhr) {
            res.status(500).json({
                "status": 500,
                "statusText": "Internal Server Error",
                "message": err.message,
                "error": {
                    "errno": err.errno,
                    "call": err.syscall,
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": err.message
                }
            });
        }
    },
    errorHandler: (err, req, res, next) => {
        res.status(500).json(errorHelpers.errorBuilder(err));
    },
    errorBuilder: (err) => {
        return {
            "status": 500,
            "statusText": "Internal Server Error",
            "message": err.message,
            "error": {
                "errno": err.errno,
                "call": err.syscall,
                "code": "INTERNAL_SERVER_ERROR",
                "message": err.message
            }
        };
    }
};

module.exports = errorHelpers;