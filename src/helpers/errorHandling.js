const respondWithError = (res, statusCode, message, error) => {
    logError(error);
    res.status(statusCode).json({ message, error: error.message });
};

const handleError = (res) => (statusCode, message, error) => {
    return respondWithError(res, statusCode, message, error);
};

module.exports = {
    handleError,
};