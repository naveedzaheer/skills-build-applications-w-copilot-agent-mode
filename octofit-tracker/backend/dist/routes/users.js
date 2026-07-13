"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const users = await User_1.User.find().populate('team').sort({ displayName: 1 });
        res.json({
            data: users,
            message: 'Users retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to retrieve users', error });
    }
});
exports.default = router;
