const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pbSchema = new Schema({
  id: {
    type: Number,
    default: Date.now()
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    match: new RegExp("^(08[0-9]{8,11})$"),
    required: true
  }
});

module.exports = mongoose.model("Phonebook", pbSchema);
