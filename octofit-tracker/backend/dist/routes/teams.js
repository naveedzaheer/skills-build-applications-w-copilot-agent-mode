"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const teams = await Team_1.Team.find().sort({ name: 1 });
        res.json({
            data: teams,
            message: 'Teams retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to retrieve teams', error });
    }
});
exports.default = router;
