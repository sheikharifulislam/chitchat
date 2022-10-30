exports.signUp = async (req, res, next) => {
    return res.status(201).json(req.body);
};
