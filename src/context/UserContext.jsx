import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUserContext = () => useContext(UserContext);

// UserProvider component, it should receive 'children'
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePhoto: "",
    completedCourses: 0,
    totalCourses: 0,
    badges: [],
    certifications: [],
    recentActivity: [],
    upcomingEvents: [],
    personalBests: [],
  });

  // Function to set the user data
  const setUserData = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
