const tokenValidator = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        token = token.split(" ")[1];
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};

module.exports = tokenValidator;
