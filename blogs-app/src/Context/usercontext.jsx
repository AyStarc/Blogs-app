// Steps
// Create a context
// Create a provider function
// Wrap whereever you want the context to be accessible with Provider

import { createContext, useContext, useState } from "react";

export const UserContext = createContext({});

// Provider is a function
export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({});
    return (
    <UserContext.Provider value={{userInfo,setUserInfo}}>
        {children}
    </UserContext.Provider>
    );
} 