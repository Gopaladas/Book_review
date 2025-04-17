import React, { useState } from "react";
import axios from "axios";
import { userApi } from "../mainApi";
import { toast } from "react-toastify";

const BookReview = ({ id, closeModel }) => {
  const [rating, setRating] = useState(5); // Default rating
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${userApi}/review/${id}`,
        {
          rating,
          reviewText,
        },
        { withCredentials: true }
      );

      console.log(response.data);

      if (response.data.success === true) {
        closeModel();
        toast.success("successfully reviewed");
      }else{
        toast.error("Not submitted");
      }

      setReviewText("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("There was an error submitting the review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* <div className="flex pt-20 px-8 gap-10">
      </div> */}

      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg mt-6 md:mt-0">
        <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>

        <div className="flex mb-4">
          <span className="text-xl">Rating: </span>
          <div className="flex ml-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                onClick={() => setRating(index + 1)}
                className={`w-6 h-6 cursor-pointer ${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.19 3.674h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27 1.19 3.674c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.124 2.27c-.785.57-1.84-.197-1.54-1.118l1.19-3.674-3.124-2.27c-.783-.57-.38-1.81.588-1.81h3.862l1.19-3.674z" />
              </svg>
            ))}
          </div>
        </div>

        <textarea
          className="w-full p-4 border rounded-lg mb-4"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows="4"
        />

        <button
          onClick={handleSubmitReview}
          className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition duration-300 transform hover:scale-105 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default BookReview;
