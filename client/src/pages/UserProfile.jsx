import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { userApi, serverApi } from "../mainApi";
import { useDispatch } from "react-redux";
import { setLoading, setLogin } from "../redux/authSlice";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { userData } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const dispatch = useDispatch();
  const fetchUserData = async () => {
    const res = await axios.get(`${userApi}/data`, {
      withCredentials: true,
    });
    console.log(res);
    if (res.data.success) {
      console.log(res);
      setProfile(res.data.userData);
      return res.data.data;
    }
  };

  useEffect(() => {
    if (userData) {
      fetchUserData();
    }
  }, [userData]);

  const handleEditClick = () => {
    if (profile) {
      setEditForm({ name: profile.name, email: profile.email });
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.post(`${userApi}/updateProfile`, editForm, {
        withCredentials: true,
      });
      console.log(res.data.data);
      if (res.data.success) {
        console.log(fetchUserData());
        dispatch(setLogin(fetchUserData()));
        setProfile(fetchUserData());
        setIsEditing(false);
        toast.success("successfully updated");
      }else{
        toast.error("not updated");
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  if (!profile) return <div className="text-center pt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md relative">
        <div className="text-center mb-10">
          <div className="text-4xl font-bold text-purple-800 mb-1">
            {profile.name}
          </div>
          <div className="text-gray-600">{profile.email}</div>

          <button
            onClick={handleEditClick}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* <div>
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              Books You Read
            </h3>
            <div className="space-y-4">
              {profile.readBooks.map((book) => (
                <div
                  key={book._id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center gap-4"
                >
                  <img
                    src={
                      book.coverImage
                        ? `${serverApi}${book.coverImage.replace(/\\/g, "/")}`
                        : "https://via.placeholder.com/60"
                    }
                    alt={book.title}
                    className="w-14 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{book.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div> */}

          <div>
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              Your Reviews
            </h3>
            <div className="space-y-4">
              {profile?.reviews?.map((r, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  {console.log(r)}
                  <h4 className="text-lg font-bold">{r?.title}</h4>
                  <p className="text-sm text-gray-600 mb-1">{r.reviewText}</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < r.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.19 3.674h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27 1.19 3.674c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.124 2.27c-.785.57-1.84-.197-1.54-1.118l1.19-3.674-3.124-2.27c-.783-.57-.38-1.81.588-1.81h3.862l1.19-3.674z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {isEditing && (
          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96">
              <h2 className="text-2xl font-bold mb-4 text-purple-700">
                Edit Profile
              </h2>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border rounded-md"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
