// import mongoose from "mongoose";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    _id: new mongoose.Schema.Types.ObjectId(),
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
}, {timestamps: true});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;