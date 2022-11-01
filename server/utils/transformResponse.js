function transformResponse(keys, data) {
    data = { ...data.toObject() };

    keys.forEach((key) => {
        delete data[key];
    });

    return data;
}

module.exports = transformResponse;
