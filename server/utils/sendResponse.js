function sendResponse(key, data) {
    return {
        isSuccess: true,
        isError: false,
        [key]: { ...data },
    };
}

module.exports = sendResponse;
