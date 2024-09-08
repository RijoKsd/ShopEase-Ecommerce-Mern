const router = require("express").router();
const {
  register,
  login,
  logout,
} = require("../../controllers/auth/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
