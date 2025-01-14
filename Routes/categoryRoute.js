const express = require('express');
const auth = require("../middleware/auth");
const CategoryController = require('../Controllers/categoryController');

const router = express.Router();

router.route('/create').post(auth,CategoryController.addCategory);

module.exports = router;