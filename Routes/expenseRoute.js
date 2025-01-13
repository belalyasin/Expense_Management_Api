const express = require('express');
const auth = require("../middleware/auth");
const UserController = require("../controllers/userController");
const ExpenseController = require("../controllers/expenseController");

const router = express.Router();

router.route('add').post(auth,ExpenseController.addExpense);
router.route('monthly_expenses').get(auth,ExpenseController.getMonthlyExpenses);
router.route('monthly_statics').get(auth,ExpenseController.getMonthlyStatics);

module.exports = router;