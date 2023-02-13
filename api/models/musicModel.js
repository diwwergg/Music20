const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true,
    index: {
      unique: true
    }
  },
  musicName: {
    type: String,
    required: true
  },
  photoLink: {
    type: String,
    required: true
  },
  musicLink: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
