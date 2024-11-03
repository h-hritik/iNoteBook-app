const express = require("express");
const mongoose = require("mongoose"); // Require mongoose
const Notes = require("../models/Notes"); // Import Notes model
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Route: Get all the notes using GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route2: Add a new note using POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters long"),
    body("description").isLength({ min: 5 }).withMessage("Description must be at least 5 characters long"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


// Route3: Update a note using PUT "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  // Find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }
  note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
  res.json({ note });
});
// Route4: Delete a note using DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
      // Find the note to be deleted and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) {
          return res.status(404).send("Not Found");
      }

      // Allow deletion only if the user owns this note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      await Notes.findByIdAndDelete(req.params.id);
      res.json({ "success": "Note has been deleted" });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
  }
});

module.exports = router;
    