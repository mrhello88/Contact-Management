const express = require("express")
const router = express.Router()
const registerController = require("../controller/register")
const zodAuthentication = require("../middleware/zod-authentication").authentication
const userSchema = require("../zodSchema/user")

router.get("/register",registerController.getRegister)
router.post("/register",zodAuthentication(userSchema),registerController.postRegister)
router.get("/verify/:token",registerController.getVerify)

router.get("/login",registerController.getLogin)
router.post("/login",registerController.postLogin)


module.exports = router  