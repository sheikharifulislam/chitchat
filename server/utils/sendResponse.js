function sendResponse(data = {}) {
    return {
        isSuccess: true,
        isError: false,
        data,
    };
}

module.exports = sendResponse;
