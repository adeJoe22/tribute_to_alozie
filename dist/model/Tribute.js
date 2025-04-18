"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tributeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    relationship: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
const TributeModel = mongoose_1.default.model("Tribute", tributeSchema, "Tribute");
exports.default = TributeModel;
