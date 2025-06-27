const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  fileUrl: String,
  propertyId: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Document", documentSchema);
