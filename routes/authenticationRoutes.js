const express = require("express");
const router = express.Router();
const { register, login, logout, getLoggedInUser } = require("../controllers/userController");

router.post('/register', register);
router.post('/login', login);
router.put('/logout', logout);
router.get('/user', getLoggedInUser)

module.exports = router;