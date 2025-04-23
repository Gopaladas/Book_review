import userModel from "../models/userMode.js";
import Book from "../models/booksModel.js";
import path from "path";
import fs from "fs";
const getUserData = async (req, res) => {
  try {
    // const { userId } = req.body;
    const userId = req.userId;
    // console.log(userId);
    const user = await userModel
      .findById(userId)
      .populate("readBooks")
      .populate({
        path: "reviewedBooks",
        populate: {
          path: "bookId",
          model: "Book",
        },
      })
      .exec();
    // console.log(user);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    // console.log(user);
    return res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        readBooks: user.readBooks,
        reviews: user.reviewedBooks.map((review) => ({
          book: review.book,
          reviewText: review.reviewText,
          rating: review.rating,
        })),
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error in data" });
  }
};

const updateUser = async (req, res) => {
  const {  name, email } = req.body;
  const userId = req.userId;
  if (!name || !email) {
    return res.json({ success: false, message: "Enter the fields" });
  }

  try {
    const user = await userModel.findById(userId);
    console.log(user);
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.save();
    return res.json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        id: user._id,
        // isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: "server error in update user" });
  }
};

const downloadBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const  userId  = req.userId;

    const user = await userModel.findById({ _id: userId });

    if (!user) {
      return res.json({ success: false, message: "User not exist" });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const filePath = path.join(process.cwd(), book.pdfFile);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "PDF file not found on server" });
    }

    await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { readBooks: bookId } },
      { new: true }
    );

    res.download(filePath, `${book.title}.pdf`, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).send("Error downloading the file.");
      }
    });
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const bookData = async (req, res) => {
  try {
    const data = await Book.find({});
    if (!data) {
      return res.json({ success: false, messsage: "No books available" });
    }

    return res.json({ success: true, data: data });
  } catch (error) {
    return res.json({ success: false, message: "Server error in bookData" });
  }
};

const bookDetails = async (req, res) => {
  const { bookId } = req.params;
  console.log(bookId);
  try {
    const book = await Book.findById(bookId).populate("book_reviews").exec();
    // console.log(book);
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getUserData, downloadBook, bookData, bookDetails, updateUser };
