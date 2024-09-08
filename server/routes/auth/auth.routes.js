const router = require("express").Router();
const {
  register,
  login,
  logout,
  checkAuth,
} = require("../../controllers/auth/auth.controller");
const authMiddleware = require("../../middleware/authMiddleware")

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get('/check-auth', authMiddleware, checkAuth)

module.exports = router;
