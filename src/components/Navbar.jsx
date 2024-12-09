import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/logo.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex  h-[60px] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="AthleteAware" className="h-10 w-auto" />
            <span className="text-xl font-bold text-gray-900">AthleteAware</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <Link to="/courses">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <span>Courses</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </Link>
            </div>
            <div className="relative group">
              <Link to="/community">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <span>Community</span>
                </button>
              </Link>
            </div>
            <div className="relative group">
              <Link to= "/profile">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                  <span>Profile</span>
                </button>
              </Link>
            </div>
            <Link to="/games" className="text-gray-600 hover:text-gray-900">
              Games
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/login" className="text-gray-500 font-bold hover:text-gray-900 px-[14px] py-[9px] hover:bg-gray-300 rounded-lg">
              Log In
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 text-white bg-[#4eb2ff] hover:bg-[#569ed6] rounded-lg transition-colors"
            >
              Start Learning
            </Link>
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
              <Link to="/profile">
                <button className="flex items-center justify-between text-gray-600 hover:text-gray-900">
                  <span>Profile</span>
                </button>
              </Link>
              <Link to="/community">
                <button className="flex items-center justify-between text-gray-600 hover:text-gray-900">
                  <span>Community</span>
                </button>
              </Link>
              <Link to="/courses">
                <button className="flex items-center justify-between text-gray-600 hover:text-gray-900">
                  <span>Courses</span>
                </button>
              </Link>
              <Link to="/games" className="text-gray-600 hover:text-gray-900">
                Games
              </Link>
              <div className="pt-4 space-y-4">
                <Link to="/login" className="block text-gray-600 hover:text-gray-900">
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-center text-white bg-[#6366F1] hover:bg-[#5558E3] rounded-lg transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;