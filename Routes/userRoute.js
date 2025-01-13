const express = require('express');
const auth = require("../middleware/auth");
const UserController = require("../controllers/userController");
const ExpenseController = require("../controllers/expenseController");

const router = express.Router();

// Register User
router.post("/register", UserController.register);
router.post("/login", UserController.login);
// router.post("/income", UserController.income);
router.route("/income").post(auth,UserController.income);
// router.post("/logout", UserController.logout);
router.route("/logout").post(auth, UserController.logout);

module.exports = router;