"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = require("../models/Leaderboard");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find().populate('user').populate('team').sort({ rank: 1 });
        res.json({
            data: leaderboard,
            message: 'Leaderboard retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to retrieve leaderboard', error });
    }
});
exports.default = router;
