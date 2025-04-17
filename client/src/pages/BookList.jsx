import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverApi, userApi } from "../mainApi";
import { useNavigate } from "react-router-dom";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${userApi}/bookdata`);
        console.log(response.data.data);
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title
      .replace(/"/g, "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-24 px-4">
    
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search by book title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-full max-w-md border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredBooks.map((book, index) => (
          <div
            key={index}
            className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col items-center"
            onClick={() => navigate(`/book/${book._id}`)} // Navigate to book detail
          >
            <img
              src={serverApi + book.coverImage.replace(/\\/g, "/")}
              alt={book.title.replace(/"/g, "")}
              className="w-full h-36 object-cover rounded"
            />
            <h3 className="mt-2 text-sm font-semibold text-center">
              {book.title.replace(/"/g, "")}
            </h3>
            <p className="text-xs text-gray-600">
              {book.author.replace(/"/g, "")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;
