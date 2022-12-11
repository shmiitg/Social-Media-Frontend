import React, { useState, createContext } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userEmail, setUserEmail] = useState(null);
    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
