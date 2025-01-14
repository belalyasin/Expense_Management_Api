// import mongoose from "mongoose";
const mongoose = require('mongoose');
const expensesSchema = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId,
    amount: {type: Number, required: true},
    date: {type: Date, default: Date.now, required: false},
    description: {type: String, required: false},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    // user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});

const Expense = mongoose.model('Expense', expensesSchema);

module.exports = Expense;