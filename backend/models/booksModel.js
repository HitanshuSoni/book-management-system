const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    userId: { type: ObjectId, required: true, ref: "User" },
    bookImage: {type: String, required: true},
    bookPurchaseLink: {type: String, required: true},
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    releasedAt: { type: Date, required: true }, //, format("YYYY-MM-DD")
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
