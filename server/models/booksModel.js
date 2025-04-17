import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    genre: { type: String },
    publishedYear: { type: String },
    coverImage: { type: String },
    pdfFile: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    book_reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
