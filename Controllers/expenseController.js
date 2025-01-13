const User = require("../models/User");
const Category = require("../models/Category");
const Expense = require("../models/Expenses");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const ExpenseController = {
    // Add a new expense
    addExpense: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const userId = decoded.id;
            const { amount, description, category, date } = req.body;
            // Validate category
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(404).json({ error: "Category not found" });
            }
            // Create and save the expense
            const expense = new Expense({
                _id: new mongoose.Types.ObjectId(),
                amount,
                description,
                category,
                user: userId,
                date: date || Date.now(), // Use provided date or default to current date
            });

            await expense.save();
            res.status(201).json({message: "Expense added successfully", expense});
        } catch (err) {
            res.status(400).json({error: "Error adding expense", details: err.message});
        }
    },

    // Get monthly expenses and totals
    getMonthlyExpenses: async (req, res) => {
        try {
            const user = req.user;
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            const monthlyExpenses = user.expenses.filter(expense => {
                const date = new Date(expense.date);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            });

            const totalExpense = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            res.status(200).json({monthlyExpenses, totalExpense});
        } catch (err) {
            res.status(500).json({error: "Error fetching expenses", details: err.message});
        }
    },
    getMonthlyStatics: async (req, res) => {
        try {
            const {token} = req.query;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);

            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            const monthlyExpenses = user.expenses.filter(expense => {
                const date = new Date(expense.date);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            });

            const totalExpense = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
            const remainingIncome = user.monthlyIncome - totalExpense;
            const averageDailyExpense = totalExpense / new Date(currentYear, currentMonth + 1, 0).getDate();

            const typeStatistics = monthlyExpenses.reduce((stats, expense) => {
                stats[expense.type] = (stats[expense.type] || 0) + expense.amount;
                return stats;
            }, {});

            res.status(200).json({
                totalExpense,
                remainingIncome,
                averageDailyExpense,
                typeStatistics,
            });
        } catch (err) {
            res.status(500).json({error: 'Error fetching statistics', details: err.message});
        }
    }
};

module.exports = ExpenseController;