const mongoose = require('mongoose');
// const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    _id: new mongoose.Schema.Types.ObjectId(),
    firstname: {type: String, required: true, unique: false},
    lastname: {type: String, required: true, unique: false},
    username: {type: String, required: true, unique: true},
    email: {
        type: String, required: true, lowercase: true, unique: true
    },
    password: {type: String, required: true, minlength: 8,},
    monthlyIncome: {type: Number, default: 0},
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
}, {timestamps: true});
// Pre-save middleware for hashing password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);