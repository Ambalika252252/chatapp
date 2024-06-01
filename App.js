import React, { useState, createContext } from "react";
import MainNavigator from './src/navigation/MainNavigator';

export const AuthContext = createContext({});

const AuthAppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function App() {
  return (
    <AuthAppProvider>
      <MainNavigator />
    </AuthAppProvider>
  );
}
