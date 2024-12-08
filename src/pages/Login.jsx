import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Form submission handler for Firebase Authentication
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Log role and user info for testing; implement conditional navigation
      console.log("Logged in as:", user);
      console.log("Role:", role);

      // Redirect based on role
      if (role === "athlete") {
        navigate("/profile"); // Redirect athletes to profile
      } else if (role === "educator") {
        navigate("/courses"); // Redirect educators to courses
      }
    } catch (err) {
      setError("Login failed. Please check your email and password.");
      console.error("Login error:", err);
    }
  };

  // Common input styles
  const inputClass =
    "w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-white to-indigo-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {/* Role Selection Dropdown */}
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`${inputClass} appearance-none`}
              required
            >
              <option value="" disabled>Select role</option>
              <option value="athlete">Athlete</option>
              <option value="educator">Educator</option>
            </select>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={inputClass}
              required
            />
          </div>

          {/* Password Field with Toggle Visibility */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`${inputClass} pr-10`}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
