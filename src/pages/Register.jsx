import React, { useState } from "react";
import { User, BookOpen, Eye, EyeOff, Camera } from "lucide-react";
import { db, storage, auth } from "../firebaseConfig"; // Import Firestore and Storage configuration
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword } from "firebase/auth";

function RegisterPage() {
  const [role, setRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    sport: "",
    level: "",
    specialization: "",
    experienceLevel: ""
  });

  const [error, setError] = useState(""); // Error message
  const [success, setSuccess] = useState(""); // Success message

  // Handle photo upload and preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  // Update form data based on input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      return "Please fill all required fields.";
    }
    if (role === "athlete" && (!formData.sport || !formData.level)) {
      return "Please fill sport and level details.";
    }
    if (role === "educator" && (!formData.specialization || !formData.experienceLevel)) {
      return "Please fill specialization and experience level.";
    }
    return null;
  };

  // Save data to Firestore on form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setSuccess(""); // Reset success state
  
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
  
    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
  
      const user = userCredential.user;
  
      // Upload the profile picture to Firebase Storage
      let profilePicURL = "";
      if (profilePic) {
        const profilePicRef = ref(storage, `profilePictures/${Date.now()}_${profilePic.name}`);
        await uploadBytes(profilePicRef, profilePic);
        profilePicURL = await getDownloadURL(profilePicRef);
      }
  
      // Define the collection name based on role
      const collectionName = role === "athlete" ? "athletes" : "educators";
  
      // Save user information along with the profile picture URL in Firestore
      await addDoc(collection(db, collectionName), {
        uid: user.uid, // Associate the Firestore document with the Auth UID
        name: formData.name,
        email: formData.email,
        profilePicture: profilePicURL,
        ...(role === "athlete"
          ? { sport: formData.sport, level: formData.level }
          : { specialization: formData.specialization, experienceLevel: formData.experienceLevel }),
      });
  
      setSuccess(`Registration successful for ${role}!`);
      setFormData({
        name: "",
        email: "",
        password: "",
        sport: "",
        level: "",
        specialization: "",
        experienceLevel: "",
      });
      setProfilePic(null);
      setProfilePicPreview("");
    } catch (error) {
      console.error("Firebase Authentication Error:", error);
      setError(error.message || "An error occurred during registration. Please try again.");
    }
  };
  
  const inputClass =
    "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-green-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        {!role ? (
          // Role Selection Section
          <div className="text-center space-y-8">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-gray-500">Select your role to continue:</p>
            <div className="flex justify-around mt-4">
              <button
                className="flex flex-col items-center p-6 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition"
                onClick={() => setRole("athlete")}
              >
                <User className="h-10 w-10 text-blue-500" />
                <span className="mt-2 font-medium">Athlete</span>
              </button>
              <button
                className="flex flex-col items-center p-6 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition"
                onClick={() => setRole("educator")}
              >
                <BookOpen className="h-10 w-10 text-green-500" />
                <span className="mt-2 font-medium">Educator</span>
              </button>
            </div>
          </div>
        ) : (
          // Registration Form Section
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {/* Profile Picture Upload */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {profilePicPreview ? (
                    <img src={profilePicPreview} alt="Profile Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-12 w-12 text-gray-500" />
                  )}
                </div>
                <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Camera className="h-4 w-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center">
              {role === "athlete" ? "Athlete Registration" : "Educator Registration"}
            </h1>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className={inputClass}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className={inputClass}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className={`${inputClass} pr-10`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Additional Fields based on Role */}
            {role === "athlete" ? (
              <>
                <div>
                  <label className="block text-sm font-medium">Sport</label>
                  <select
                    name="sport"
                    className={inputClass}
                    value={formData.sport}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your sport</option>
                    <option value="running">Running</option>
                    <option value="swimming">Swimming</option>
                    <option value="gymnastics">Gymnastics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Level</label>
                  <select
                    name="level"
                    className={inputClass}
                    value={formData.level}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium">Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    placeholder="e.g., Sports Medicine, Anti-Doping Expert"
                    className={inputClass}
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Experience Level</label>
                  <select
                    name="experienceLevel"
                    className={inputClass}
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your experience level</option>
                    <option value="junior">Junior</option>
                    <option value="mid">Mid-level</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
              Register
            </button>
            <button
              type="button"
              className="w-full py-2 px-4 bg-gray-100 text-gray-600 font-medium rounded-md hover:bg-gray-200 transition mt-2"
              onClick={() => setRole(null)}
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;