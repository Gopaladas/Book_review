import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    default: true,
  },
  uploadedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
