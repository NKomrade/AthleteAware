import React, { createContext, useState, useContext } from "react";

// Create UserContext
const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

// Create a provider component to wrap around the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Set the user data
  const setUserData = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
