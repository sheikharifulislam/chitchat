const router = require("express").Router();
const authValidator = require("../middlewares/auth.validator");
const authController = require("../controller/auth.controller");

router.post("/signup", authValidator.signUpValidator, authController.signUp);
router.post("/signin", authValidator.loginValidator, authController.signIn);

module.exports = router;
