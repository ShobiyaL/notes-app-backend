const Note = require('../models/noteModel');

// View notes
exports.allNotes = async (req, res) => {
  let user = req.user._id;
  // console.log(user);
  try {
    const notes = await Note.find({ user });
    // console.log(data);
    if (!notes) {
      return res.status(401).json({
        message: 'Notes not available',
        status: 'error',
      });
    }
    res.status(200).json({
      message: 'All notes presented in db',
      status: 'success',
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: 'error',
    });
  }
};

// Create Note
exports.createNote = async (req, res) => {
  //   console.log(req.body, req.user);
  const { title, description } = req.body;
  const { _id } = req.user;
  //   console.log(_id, title, description);
  try {
    if (!title || !description) {
      return res
        .status(401)
        .json({ message: 'Fields should not be empty', status: 'error' });
    }
    const data = await Note.create({
      title,
      description,
      user: _id,
    });
    // console.log(data);
    if (!data) {
      return res
        .status(401)
        .json({ message: 'Note not created', status: 'error' });
    }
    res.status(200).json({
      message: 'Note has been created',
      status: 'success',
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: 'error',
    });
  }
};

// Update note
exports.updateNote = async (req, res) => {
  let noteid = req.params.id;
  // console.log(noteid);
  const { title, description } = req.body;
  // console.log(title, description);
  try {
    if (!noteid) {
      return res
        .status(404)
        .json({ message: 'No note Found', status: 'error' });
    }

    const note = await Note.findByIdAndUpdate(
      noteid,
      { $set: req.body },
      { new: true }
    );
    // console.log(note);
    if (!note) {
      return res.status(400).json({
        message: 'Couldnot update note, try again...',
        status: 'error',
      });
    }
    res.json({
      message: 'Successfully updated note Info',
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: 'error',
    });
  }
};

// Delete note
exports.deleteNote = async (req, res) => {
  let noteid = req.params.id;
  // console.log(noteid, 'noteid 107');
  try {
    if (!noteid) {
      return res
        .status(404)
        .json({ message: 'No note Found', status: 'error' });
    }

    const note = await Note.findByIdAndDelete(noteid);
    if (note) {
      return res.status(200).json({
        message: 'Successfully deleted your note ',
        status: 'success',
      });
    } else {
      return res.status(400).json({
        message: 'Unable to delete the note',
        status: 'error',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
      status: 'error',
    });
  }
};
