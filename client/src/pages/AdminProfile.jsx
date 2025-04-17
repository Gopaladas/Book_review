import React, { useEffect, useState } from "react";
import axios from "axios";
import { adminApi, serverApi } from "../mainApi";
import { toast } from "react-toastify";

const AdminProfile = ({ adminId }) => {
  const [adminData, setAdminData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    publishedYear: "",
    coverImage: null,
    pdfFile: null,
  });
  const fetchAdminData = async () => {
    try {
      const res = await axios.get(`${adminApi}/admindata`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setAdminData(res.data.adminData);
        return res.data.adminData;
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };
  useEffect(() => {
    fetchAdminData();
  }, [adminId]);

  const handleDeleteBook = async (bookId) => {
    try {
      const res = await axios.post(
        `${adminApi}/delete/${bookId}`,
        {},
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.success === true) {
        const updatedData = await fetchAdminData();
        setAdminData(updatedData);
        toast.success("deleted successfully");
      } else {
        toast.error("faild to delete");
      }
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      // data.append("uploadedBy", adminData.id);

      const res = await axios.post(`${adminApi}/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(res.data.success);
      if (res.data.success) {
        console.log("HI");
        const updatedData = await fetchAdminData();
        setAdminData(updatedData);
        setShowForm(false);
        setFormData({
          title: "",
          author: "",
          description: "",
          genre: "",
          publishedYear: "",
          coverImage: null,
          pdfFile: null,
        });
        toast.success("uploaded successfully");
      } else {
        toast.error("faild to upload");
      }
    } catch (error) {
      console.error("Error uploading book:", error);
    }
  };

  if (!adminData) return <div className="text-center pt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 relative">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-purple-800">
              {adminData.name}
            </h2>
            <p className="text-gray-600">{adminData.email}</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Upload Book
          </button>
        </div>

        <h3 className="text-2xl font-semibold text-purple-700 mb-4">
          Uploaded Books
        </h3>
        <div className="space-y-3">
          {adminData.uploadedBooks.length > 0 ? (
            adminData.uploadedBooks.map((book) => (
              <div
                key={book._id}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={serverApi + `${book.coverImage.replace(/\\/g, "/")}`}
                    alt={book.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {book.title.replace(/"/g, "")}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {book.author.toString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteBook(book._id)}
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No books uploaded yet.</p>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <form
            onSubmit={handleUploadSubmit}
            className="bg-white p-6 rounded-lg shadow-xl space-y-4 w-96"
          >
            <h3 className="text-lg font-bold text-purple-700">
              Upload New Book
            </h3>

            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={formData.author}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="publishedYear"
              placeholder="Published Year"
              value={formData.publishedYear}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />

            <label className="block text-sm">Cover Image:</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleInputChange}
              required
              className="w-full"
            />

            <label className="block text-sm">PDF File:</label>
            <input
              type="file"
              name="pdfFile"
              accept="application/pdf"
              onChange={handleInputChange}
              required
              className="w-full"
            />

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
