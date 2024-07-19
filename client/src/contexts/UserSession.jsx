import { createContext, useState, useEffect } from "react";

export const UserSessionContext = createContext(null);

const getUserSession = async () => {
  const response = await fetch("http://localhost:5050/api/profile", {
    credentials: "include",
  });
  return await response.json();
};

export default function UserSessionProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    getUserSession()
      .then((data) => {
        if (data.success) return setSession(data.user);
        console.error(data.error);
      })
      .catch((error) => console.error(error));
  });

  return (
    <UserSessionContext.Provider value={session}>
      {children}
    </UserSessionContext.Provider>
  );
}
