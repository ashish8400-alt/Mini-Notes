const Note = require("../models/Note");

// GET ALL NOTES
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      notes,
    });

  } catch (error) {
    console.log("Get Notes Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// CREATE NOTE
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      user: req.userId,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });

  } catch (error) {
    console.log("Create Note Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// DELETE NOTE
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      user: req.userId,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await Note.findByIdAndDelete(id);

    res.status(200).json({
      message: "Note deleted successfully",
    });

  } catch (error) {
    console.log("Delete Note Error:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  getNotes,
  createNote,
  deleteNote,
};