const jwt = require("jsonwebtoken");

const tokenValidator = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        token = token.split(" ")[1];
        //console.log(token);

        jwt.verify(token, process.env.JWT_KEY);
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};

module.exports = tokenValidator;
