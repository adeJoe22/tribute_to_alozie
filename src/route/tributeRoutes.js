const express = require("express");
const router = express.Router();
const Tribute = require("../model/Tribute");

// GET all tributes
router.get("/", async (req, res) => {
  try {
    const tributes = await Tribute.find().sort({ date: -1 });
    res.json(tributes);
  } catch (error) {
    console.error("Error fetching tributes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new tribute
router.post("/", async (req, res) => {
  try {
    const { name, relationship, message, date } = req.body;

    // Validate required fields
    if (!name || !relationship || !message) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Create new tribute
    const newTribute = new Tribute({
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
router.get("/:id", async (req, res) => {
  try {
    const tribute = await Tribute.findById(req.params.id);

    if (!tribute) {
      return res.status(404).json({ message: "Tribute not found" });
    }

    res.json(tribute);
  } catch (error) {
    console.error("Error fetching tribute:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
