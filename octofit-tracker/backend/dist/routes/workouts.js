"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().sort({ difficulty: 1, title: 1 });
        res.json({
            data: workouts,
            message: 'Workouts retrieved successfully',
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to retrieve workouts', error });
    }
});
exports.default = router;
