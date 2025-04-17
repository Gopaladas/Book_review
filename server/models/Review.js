import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    userName: { type: String, required: true },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
export default Review;
