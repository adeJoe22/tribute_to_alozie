import express, { Request, Response } from "express";
import TributeModel from "../model/Tribute";

const router = express.Router();

// GET all tributes
router.get("/", async (req: Request, res: Response) => {
  try {
    const tributes = await TributeModel.find().sort({ date: -1 });
    res.json(tributes);
  } catch (error) {
    console.error("Error fetching tributes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new tribute
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, relationship, message, date } = req.body;

    // Validate required fields
    if (!name || !relationship || !message) {
      res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create new tribute
    const newTribute = new TributeModel({
      name,
      relationship,
      message,
      date: date || new Date(),
    });

    // Save to database
    const savedTribute = await newTribute.save();
    res.status(201).json(savedTribute);
  } catch (error) {
    console.error("Error creating tribute:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET a single tribute by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const tribute = await TributeModel.findById(req.params.id);

    if (!tribute) {
      res.status(404).json({ message: "Tribute not found" });
    }

    res.json(tribute);
  } catch (error) {
    console.error("Error fetching tribute:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
