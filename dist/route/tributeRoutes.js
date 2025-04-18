"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Tribute_1 = __importDefault(require("../model/Tribute"));
const router = express_1.default.Router();
// GET all tributes
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tributes = yield Tribute_1.default.find().sort({ date: -1 });
        res.json(tributes);
    }
    catch (error) {
        console.error("Error fetching tributes:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
// POST a new tribute
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, relationship, message, date } = req.body;
        // Validate required fields
        if (!name || !relationship || !message) {
            res
                .status(400)
                .json({ message: "Please provide all required fields" });
        }
        // Create new tribute
        const newTribute = new Tribute_1.default({
            name,
            relationship,
            message,
            date: date || new Date(),
        });
        // Save to database
        const savedTribute = yield newTribute.save();
        res.status(201).json(savedTribute);
    }
    catch (error) {
        console.error("Error creating tribute:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
// GET a single tribute by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tribute = yield Tribute_1.default.findById(req.params.id);
        if (!tribute) {
            res.status(404).json({ message: "Tribute not found" });
        }
        res.json(tribute);
    }
    catch (error) {
        console.error("Error fetching tribute:", error);
        res.status(500).json({ message: "Server error" });
    }
}));
exports.default = router;
