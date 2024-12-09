// CommunityForum.js
import React, { useState, useRef } from "react";
import { AiOutlineBold, AiOutlineItalic } from "react-icons/ai";
import { MessageCircle } from "lucide-react";
import { BiImageAdd, BiUpvote, BiDownvote } from "react-icons/bi";
import { RiCloseFill } from "react-icons/ri";
import { useUser } from "../context/UserContext"; // Adjust the path as needed

export default function CommunityForum() {
  const { user } = useUser(); // Get user state from context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const contentEditableRef = useRef(null);

  // Function to open modal
  const openModal = () => {
    if (!user) {
      alert("Please register or login to post!");
      // Redirect to register page if not logged in
      window.location.href = "/register";
    } else {
      setIsModalOpen(true);
    }
  };

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Functions for text formatting
  const handleBold = (e) => {
    e.preventDefault();
    document.execCommand("bold");
  };

  const handleItalic = (e) => {
    e.preventDefault();
    document.execCommand("italic");
  };

  const handleUnderline = (e) => {
    e.preventDefault();
    document.execCommand("underline");
  };

  // Check for placeholder visibility
  const handleContentChange = () => {
    const content = contentEditableRef.current.innerHTML;
    const placeholder = contentEditableRef.current.querySelector(".placeholder");
    if (content.trim()) {
      placeholder.style.display = "none";
    } else {
      placeholder.style.display = "block";
    }
  };

  // Handle Upvote
  const handleUpvote = () => {
    if (!user) {
      alert("Please register or login to upvote!");
      window.location.href = "/register";
    } else {
      console.log("Upvoted!");
      // Implement upvote logic here
    }
  };

  // Handle Downvote
  const handleDownvote = () => {
    if (!user) {
      alert("Please register or login to downvote!");
      window.location.href = "/register";
    } else {
      console.log("Downvoted!");
      // Implement downvote logic here
    }
  };

  // Handle Comment
  const handleComment = () => {
    if (!user) {
      alert("Please register or login to comment!");
      window.location.href = "/register";
    } else {
      console.log("Commented!");
      // Implement comment logic here
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Banner Image with Parallax Effect */}
      <div className="relative h-80 mb-8 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url(/forest.jpg)",
            backgroundAttachment: "fixed",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
          <h1 className="text-4xl text-center font-bold">
            Join the Conversation, Share Ideas, and Connect with Community Members!
          </h1>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="top-0 z-10 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* User Profile Icon */}
            {user && (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={user.profilePicture || "/default-avatar.jpg"} // Default image if user doesn't have a profile image
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Community Forum
            </h1>
          </div>
          <button
            onClick={openModal}
            className="bg-green-600 text-white hover:bg-green-700 py-2 px-4 rounded-lg flex items-center space-x-2"
          >
            <span>New Post</span>
          </button>
        </div>
      </header>

      {/* Modal Window (Create New Post) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all duration-300 scale-105 p-6">
            {/* Modal Header with Close Button */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                Create a New Post
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 dark:text-white hover:text-gray-800"
              >
                <RiCloseFill className="w-6 h-6" />
              </button>
            </div>

            {/* Post Form */}
            <div
              className="space-y-4 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 200px)" }}
            >
              {/* Post Title Input */}
              <input
                type="text"
                placeholder="Post Title"
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Rich Text Content Editable Div */}
              <div
                ref={contentEditableRef}
                contentEditable="true"
                onInput={handleContentChange}
                className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px] relative"
                role="textbox"
              >
                {/* Placeholder Text */}
                <span className="placeholder absolute left-4 top-4 text-gray-500 dark:text-gray-400">
                  What's on your mind?
                </span>
              </div>

              {/* Image Upload Section */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  {/* Image Upload Button */}
                  <label
                    htmlFor="image-upload"
                    className="flex items-center text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                  >
                    <BiImageAdd className="w-6 h-6" />
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {/* Text Formatting Buttons */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button onClick={handleBold} className="text-xl text-gray-600 dark:text-gray-400 hover:text-blue-500" title="Bold">
                      <AiOutlineBold />
                    </button>
                    <button onClick={handleItalic} className="text-xl text-gray-600 dark:text-gray-400 hover:text-blue-500" title="Italic">
                      <AiOutlineItalic />
                    </button>
                    <button onClick={handleUnderline} className="text-xl text-gray-600 dark:text-gray-400 hover:text-blue-500" title="Underline">
                      <AiOutlineItalic /> {/* Consider using a different icon or keeping the 'U' */}
                      <u>U</u>
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Preview with Remove Button */}
              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="max-w-full max-h-48 object-contain rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-md"
                  />
                  <button
                    onClick={() => setImagePreview(null)} // Function to remove the image
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
                    title="Remove Image"
                  >
                    <RiCloseFill className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Main Content Container */}
        <div className="flex space-x-8">
          
          {/* Left Section: Current Posts */}
          <div className="w-2/3 space-y-6 mb-8">
            {/* Post 1 */}
            <div className="w-full shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
              <div className="p-4 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-white">John Doe</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-700 dark:text-gray-300">
                  This is a sample post content. It can be a question, discussion topic, or any other community-related content.
                </p>
              </div>

              <div className="p-4 flex items-center space-x-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleUpvote}
                  className="flex items-center text-black dark:text-black hover:text-black"
                >
                  <BiUpvote className="w-5 h-5 mr-2" />
                </button>
                <button
                  onClick={handleDownvote}
                  className="flex items-center text-black dark:text-black hover:text-black"
                >
                  <BiDownvote className="w-5 h-5 mr-2" />
                </button>
                <button
                  onClick={handleComment}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 ml-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>Comment</span>
                </button>
              </div>
            </div>

            {/* Post 2 */}
            <div className="w-full shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
              <div className="p-4 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-white">Ronn Smith</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">4 hours ago</p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-700 dark:text-gray-300">
                  This is another post content. Discussing the latest community events and updates.
                </p>
              </div>

              <div className="p-4 flex items-center space-x-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleUpvote}
                  className="flex items-center text-black dark:text-black hover:text-black"
                >
                  <BiUpvote className="w-5 h-5 mr-2" />
                </button>
                <button
                  onClick={handleDownvote}
                  className="flex items-center text-black dark:text-black hover:text-black"
                >
                  <BiDownvote className="w-5 h-5 mr-2" />
                </button>
                <button
                  onClick={handleComment}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 ml-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>Comment</span>
                </button>
              </div>
            </div>

            {/* Post 3 */}
            <div className="w-full shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg">
              <div className="p-4 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg text-gray-800 dark:text-white">Jane Williamson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Here’s another post with some insights on community discussions and upcoming events.
                </p>
              </div>

              <div className="p-4 flex items-center space-x-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleUpvote}
                  className="flex items-center text-black dark:text-black hover:text-black"
                >
                  <BiUpvote className="w-5 h-5 mr-2" />
                </button>
                <button
                  onClick={handleDownvote}
                  className="flex items-center text-black dark:text-black hover:text-black"
                >
                  <BiDownvote className="w-5 h-5 mr-2" />
                </button>
                <button
                  onClick={handleComment}
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 ml-auto"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>Comment</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Section: Trending Posts */}
          <div className="w-1/3 space-y-6 mb-8">
            <div className="shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Trending Posts</h3>

              {/* Trending Post 1 */}
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-lg text-white">UN</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-800 dark:text-white">Trending Post Title 1</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">By User Name - 1 hour ago</p>
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400">Read More</button>
              </div>

              {/* Trending Post 2 */}
              <div className="flex items-center justify-between mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-lg text-white">UN</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-800 dark:text-white">Trending Post Title 2</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">By User Name - 2 hours ago</p>
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400">Read More</button>
              </div>

              {/* Trending Post 3 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-lg text-white">UN</span>
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-800 dark:text-white">Trending Post Title 3</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">By User Name - 3 hours ago</p>
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400">Read More</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
