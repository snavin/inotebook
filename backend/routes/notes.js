const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes using: GET "api/auth/getuser".Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: "some error occured" });
  }
});

//ROUTE 2: Add new note using : POST "api/auth/addnote".Login required
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body("description", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //if there are any errors, return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ errors: "some error occured" });
    }
  }
);

//ROUTE 3: Update an existing note using : PUT "api/auth/updatenote".Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create new note object
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

    //Find a note to be updated and update it
    let notes = await Note.findById(req.params.id);
    if (!notes) {
      return res.status(404).json({ errors: "notes not found" });
    }

    if (notes.user.toString() != req.user.id) {
      return res.status(401).json({ errors: "not allowed" });
    }

    notes = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: "some error occured" });
  }
});

//ROUTE 4: Delete an existing note using : DELETE "api/auth/deletenote".Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create new note object
    const newNote = {};

    //Find a note to be updated and delete it
    let notes = await Note.findById(req.params.id);
    if (!notes) {
      return res.status(404).json({ errors: "notes not found" });
    }

    //Allows deletion only if user owns this note
    if (notes.user.toString() != req.user.id) {
      return res.status(401).json({ errors: "not allowed" });
    }

    notes = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Notes has been deleted", notes: notes });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: "some error occured" });
  }
});

module.exports = router;
