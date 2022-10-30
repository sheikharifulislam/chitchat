const router = require("express").Router();
const authValidation = require("../middlewares/auth.validation");
const authController = require("../controller/auth.controller");
router.post("/signup", authValidation, authController.signUp);

module.exports = router;
