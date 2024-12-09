import React, { useState } from "react";
import { User, Eye, EyeOff, Camera } from "lucide-react";
import { db, storage, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useUser } from "../context/UserContext"; 

function RegisterPage() {
  const { setUserData } = useUser(); // Get setUserData from context
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
    region: "",
    govtID: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(file.type)) {
        setError("Only image files (jpg, jpeg, png) are allowed.");
        return;
      }
      setProfilePic(file);
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, username, password, gender, region, govtID } = formData;
    if (role === "user" && (!name || !username || !password || !gender || !region)) {
      return "Please fill all required fields.";
    }
    if (role === "admin" && (!name || !username || !password || !govtID)) {
      return "Please fill all required fields for Admin.";
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      return "Name can only contain letters and spaces.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long, contain one uppercase letter, and one special character.";
    }

    if (role === "admin" && isNaN(govtID)) {
      return "Govt. Issued ID must be a valid number.";
    }

    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.username,
        formData.password
      );
      const user = userCredential.user;

      let profilePicURL = "";
      if (profilePic) {
        const profilePicRef = ref(storage, `profilePictures/${Date.now()}_${profilePic.name}`);
        await uploadBytes(profilePicRef, profilePic);
        profilePicURL = await getDownloadURL(profilePicRef);
      }

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: formData.name,
        username: formData.username,
        profilePicture: profilePicURL,
        role,
        gender: formData.gender,
        region: formData.region,
        govtID: formData.govtID,
      });

      await sendEmailVerification(user);

      // Set user data in context after successful registration
      setUserData({
        uid: user.uid,
        name: formData.name,
        username: formData.username,
        profilePicture: profilePicURL,
        role,
        gender: formData.gender,
        region: formData.region,
        govtID: formData.govtID,
      });

      setSuccess("Registration successful! A verification email has been sent.");
      setFormData({
        name: "",
        username: "",
        password: "",
        gender: "",
        region: "",
        govtID: "",
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
        <form className="space-y-4" onSubmit={handleFormSubmit}>
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

          <h1 className="text-2xl font-bold text-center">{role === "user" ? "User Registration" : "Admin Registration"}</h1>

          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={inputClass}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

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

          {role === "user" && (
            <>
              <div>
                <label className="block text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClass}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Region</label>
                <input
                  type="text"
                  name="region"
                  placeholder="Enter your region"
                  className={inputClass}
                  value={formData.region}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="username"
              placeholder="Enter your email"
              className={inputClass}
              value={formData.username}
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

          {role === "admin" && (
            <div>
              <label className="block text-sm font-medium">Govt. Issued ID</label>
              <input
                type="text"
                name="govtID"
                placeholder="Enter your Govt. ID"
                className={inputClass}
                value={formData.govtID}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>

          <div className="text-center text-red-500">{error}</div>
          <div className="text-center text-green-500">{success}</div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;