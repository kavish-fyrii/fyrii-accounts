import React from "react";

export const UserContext = React.createContext();

// This context provider is passed to any component requiring the context
export const UserProvider = ({ children }) => {
  const [data, setData] = React.useState(undefined);

  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
};
