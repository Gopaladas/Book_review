import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Book from "../models/booksModel.js";
import Review from "../models/Review.js";

const register = async (req, res) => {
  const { email, name, password } = req.body;
  // console.log(email);
  if (!email || !name || !password) {
    return res.json({ success: false, message: "Enter all details" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.json({ success: false, message: "Admin already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      data: {
        name,
        email,
        id: newAdmin._id,
        isAdmin: newAdmin.isAdmin,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "Enter all details" });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin) {
      return res.json({ success: false, message: "email is not correct" });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!verifyPassword) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      data: {
        name: existingAdmin.name,
        email,
        id: existingAdmin._id,
        isAdmin: true,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const uploadBook = async (req, res) => {
  try {
    const { title, author, description, genre, publishedYear } = req.body;

    if (!req.files["coverImage"] || !req.files["pdfFile"]) {
      return res
        .status(400)
        .json({ message: "Cover image and PDF are required." });
    }

    const coverImagePath = req.files["coverImage"][0].path;
    const pdfFilePath = req.files["pdfFile"][0].path;

    const  userId  = req.userId;

    const newBook = new Book({
      title,
      author,
      description,
      genre,
      publishedYear,
      coverImage: coverImagePath,
      pdfFile: pdfFilePath,
      uploadedBy: userId,
    });

    const savedBook = await newBook.save();

    await Admin.findByIdAndUpdate(
      userId,
      {
        $push: { uploadedBooks: savedBook._id },
      },
      { new: true }
    );

    res
      .status(201)
      .json({
        success: true,
        message: "Book uploaded successfully!",
        data: newBook,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong while uploading the book." });
  }
};

const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  const  userId  = req.userId;

  try {
    const bookExist = await Book.findById({ _id: bookId });

    if (!bookExist) {
      return res.json({ success: false, message: "Book not found" });
    }

    if (bookExist.uploadedBy.toString() !== userId) {
      return res.json({ success: false, message: "unauthorized access" });
    }

    await Review.deleteMany({ bookId: bookId });

    await Book.findByIdAndDelete({ _id: bookId });

    await Admin.findByIdAndUpdate(
      userId,
      {
        $pull: { uploadedBooks: bookId },
      },
      { new: true }
    );

    return res
      .status(201)
      .json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

const getAdminData = async (req, res) => {
  try {
    const  userId  = req.userId;
     console.log(userId);
    if (!userId) {
      return res.json({ success: false, message: "Admin ID is required" });
    }

    const admin = await Admin.findById(userId).populate("uploadedBooks").exec();
    // console.log(admin);

    if (!admin) {
      return res.json({ success: false, message: "Admin not found" });
    }
    return res.json({
      success: true,
      adminData: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        isAdmin: admin.isAdmin,
        uploadedBooks: admin.uploadedBooks,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { login, register, uploadBook, deleteBook, getAdminData };
