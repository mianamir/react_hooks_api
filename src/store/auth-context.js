import React, { useState } from 'react';

// use this for app or component wise state
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {}
}); 


export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const logoutHandler = () => {};

    return <AuthContext.Provider>{props.children}</AuthContext.Provider>
};


export default AuthContext;

