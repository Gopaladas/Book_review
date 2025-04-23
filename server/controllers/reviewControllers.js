import express from "express";
import Review from "../models/Review.js";
import Book from "../models/booksModel.js";
import userModel from "../models/userMode.js";

const review = async (req, res) => {
  const { bookId } = req.params;
  const {  rating, reviewText } = req.body;
  const userId = req.userId;

  if (!rating || !reviewText) {
    return res.json({ success: false, messsage: "Enter the fields" });
  }

  try {
    const user = await userModel.findById({ _id: userId });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const existBook = await Book.findById({ _id: bookId });

    if (!existBook) {
      return res.json({ success: false, message: "Book not found" });
    }

    const review = new Review({
      userName: user.name,
      rating,
      reviewText,
      user: userId,
      bookId,
    });

    await review.save();

    await Book.findByIdAndUpdate(
      bookId,
      {
        $push: { book_reviews: review._id },
      },
      { new: true }
    );

    await userModel.findByIdAndUpdate(
      userId,
      {
        $push: { reviewedBooks: review._id },
      },
      { new: true }
    );

    return res.json({success:true,message:"successfully submited review"});
  } catch (error) {
    return res.json({ success: false, message: "Server error" });
  }
};

export { review };
