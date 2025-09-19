const express = require("express")
const { register, login, getAllUsers, setAvatar, logout } = require("../controller/userController")


const router = express.Router()


router.post("/signup",register)
router.post("/login",login)
router.get("/alluser/:id",getAllUsers)
router.post("/setavatar/:id",setAvatar)
router.post("/logout/:id",logout)


module.exports = router