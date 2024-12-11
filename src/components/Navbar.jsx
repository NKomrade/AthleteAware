import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { Globe } from 'lucide-react'; // Using Lucide icon library for the globe icon

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false); // To manage language menu visibility

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-[60px] items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="AthleteAware" className="h-10 w-auto" />
            <span className="text-xl font-bold text-gray-900">AthleteAware</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-auto">
            {/* Links for Courses and Community */}
            <div className="flex items-center space-x-6">
              <Link to="/courses" className="text-gray-600 hover:text-gray-900">
                Courses
              </Link>
              <Link to="/community" className="text-gray-600 hover:text-gray-900">
                Community
              </Link>
            </div>

            {/* Sign in Button */}
            <Link
              to="/register"
              className="px-4 py-2 text-white bg-[#4eb2ff] hover:bg-[#569ed6] rounded-lg transition-colors"
            >
              Sign in
            </Link>

            {/* Globe Icon for Language Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsLanguageMenuOpen(true)} // Show the dropdown when hovered
              onMouseLeave={() => setIsLanguageMenuOpen(false)} // Hide the dropdown when mouse leaves
            >
              {/* Globe Icon */}
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <Globe className="w-6 h-6" />
              </button>

              {/* Dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">English</li>
                    <li className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">Hindi</li>
                    <li className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">Punjabi</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/courses">
                <button className="flex items-center justify-between text-gray-600 hover:text-gray-900">
                  <span>Courses</span>
                </button>
              </Link>
              <Link to="/community">
                <button className="flex items-center justify-between text-gray-600 hover:text-gray-900">
                  <span>Community</span>
                </button>
              </Link>
              <div className="pt-4 space-y-4">
                <Link to="/register" className="block px-4 py-2 text-center text-white bg-[#6366F1] hover:bg-[#5558E3] rounded-lg transition-colors">
                  Sign in
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    className="flex items-center justify-center text-gray-600 hover:text-gray-900"
                  >
                    <Globe className="w-6 h-6" />
                  </button>
                  {isLanguageMenuOpen && (
                    <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2">
                      <ul className="space-y-2">
                        <li className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">English</li>
                        <li className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">Hindi</li>
                        <li className="text-sm text-gray-700 hover:text-gray-900 cursor-pointer">Punjabi</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
