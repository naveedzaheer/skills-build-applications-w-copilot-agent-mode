"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find().populate('user').sort({ loggedAt: -1 });
        res.json({
            data: activities,
            message: 'Activities retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to retrieve activities', error });
    }
});
exports.default = router;
