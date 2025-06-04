import { createContext, useEffect, useState } from "react";

// Create a context for the user
export const UserContext = createContext();

// Define the UserProvider component
const UserProvider = ({ children }) => {
    // Initialize the state with user data from localStorage, if available
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return null;
        }
    });

    // Update localStorage whenever currentUser changes
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("user", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("user"); // Remove user data if logged out
        }
    }, [currentUser]);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;