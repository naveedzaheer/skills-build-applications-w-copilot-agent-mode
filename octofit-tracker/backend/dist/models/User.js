"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    profileImage: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
