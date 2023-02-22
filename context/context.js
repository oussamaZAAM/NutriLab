import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
export const User_data = createContext(null);

function Context({ children }) {
  const { data: session } = useSession();

  const [user, setUser] = useState(session);
  useEffect(() => {
    setUser(session);
  }, [session]);
  return (
    <User_data.Provider value={{ user, setUser }}>
      {children}
    </User_data.Provider>
  );
}

export default Context;
