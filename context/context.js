import { createContext, useState, useEffect } from "react";

export const User_data = createContext(null);
function Context({ children, currentUser }) {
  const [user, setUser] = useState(currentUser);
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  return (
    <User_data.Provider value={{ user, setUser }}>
      {children}
    </User_data.Provider>
  );
}

export default Context;
