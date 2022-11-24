const router = require("express").Router();
const authValidator = require("../middlewares/auth.validator");
const authController = require("../controller/auth.controller");
const tokenValidator = require("../middlewares/token.validation");

router.post("/signup", authValidator.signUpValidator, authController.signUp);
router.post("/signin", authValidator.loginValidator, authController.signIn);
router.post("/forgot-password", authValidator.forgotPasswordValidator, authController.forgotPassword);
router.post("/reset-password", tokenValidator, authController.resetPassword);
router.get("/verify-email", tokenValidator, authController.verifyEmail);

module.exports = router;
