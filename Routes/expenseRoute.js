const express = require('express');
const auth = require("../middleware/auth");
const UserController = require("../controllers/userController");
const ExpenseController = require("../controllers/expenseController");

const router = express.Router();

router.route('/create').post(auth,ExpenseController.addExpense);
router.route('/monthly_expenses').get(auth,ExpenseController.getCurrentMonthExpenses);
router.route('/monthly_statics').get(auth,ExpenseController.getMonthlyStatics);
router.route('/expense_type_statistics').get(auth,ExpenseController.getExpenseTypeStatistics);

module.exports = router;