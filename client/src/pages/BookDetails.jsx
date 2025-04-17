import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { serverApi, userApi } from "../mainApi";
import BookReview from "./BookReview";
import { useSelector, useDispatch } from "react-redux";
const BookDetails = () => {
  const { userData } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${userApi}/bookdetails/${id}`);
        console.log(response.data);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };

    fetchBookDetails();
  }, [id,showReviewModal]);

  if (!book) return <div className="text-center pt-20">Loading...</div>;

  const coverImageUrl = book.coverImage
    ? `${serverApi}${book.coverImage.replace(/\\/g, "/")}`
    : "https://via.placeholder.com/300x400.png?text=No+Cover";

  const pdfFileUrl = book.pdfFile
    ? `${serverApi}${book.pdfFile.replace(/\\/g, "/")}`
    : "#";

  return (
    <>
      <div className="flex flex-col md:flex-row pt-20 px-8 gap-10">
        <div className="flex-1 max-w-xs mx-auto mb-6 md:mb-0">
          <img
            src={coverImageUrl}
            alt={book.title || "No Title"}
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex-1 pl-6">
          <h2 className="text-3xl font-bold text-purple-800 mb-2">
            {book.title || "No Title"}
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            <strong className="font-semibold">Author:</strong>{" "}
            {book.author || "Unknown Author"}
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong className="font-semibold">Genre:</strong>{" "}
            {book.genre || "N/A"}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong className="font-semibold">Published Year:</strong>{" "}
            {book.publishedYear || "N/A"}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong className="font-semibold">Description:</strong>{" "}
            {book.description || "No description available."}
          </p>

          <div className="mt-6 flex gap-6 flex-wrap">
            <a href={pdfFileUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition duration-300 transform hover:scale-105 w-full md:w-auto">
                Download PDF
              </button>
            </a>
            {userData?.isAdmin !== true ? (
              <div>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition duration-300 transform hover:scale-105 w-full md:w-64 sm:w-64"
                >
                  Leave a Review
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mt-6 md:mt-0 h-80 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Reviews</h3>
          {book.book_reviews && book.book_reviews.length > 0 ? (
            book.book_reviews.map((review) => (
              <div key={review._id} className="border-b py-3">
                <div className="flex items-center justify-between mb-1">
                  <strong className="text-purple-700">
                    {review.userName || "Anonymous"}
                  </strong>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < review?.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.19 3.674h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27 1.19 3.674c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.124 2.27c-.785.57-1.84-.197-1.54-1.118l1.19-3.674-3.124-2.27c-.783-.57-.38-1.81.588-1.81h3.862l1.19-3.674z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.reviewText}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-11/12 md:w-1/2 relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <BookReview id={id} closeModel={() => setShowReviewModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
