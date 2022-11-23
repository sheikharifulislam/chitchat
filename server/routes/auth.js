const router = require("express").Router();
const authValidator = require("../middlewares/auth.validator");
const authController = require("../controller/auth.controller");

router.post("/signup", authValidator.signUpValidator, authController.signUp);
router.post("/signin", authValidator.loginValidator, authController.signIn);
router.post("/forgot-password", authValidator.forgotPasswordValidator, authController.forgotPassword);

module.exports = router;
