const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'
  },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
