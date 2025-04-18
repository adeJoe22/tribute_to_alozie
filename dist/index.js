"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const tributeRoutes_1 = __importDefault(require("./route/tributeRoutes"));
// Load environment variables
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGODB_CLOUD)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
// Routes
app.use("/api/tributes", tributeRoutes_1.default);
// Basic route
app.get("/", (req, res) => {
    res.send("Tribute App API is running");
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
