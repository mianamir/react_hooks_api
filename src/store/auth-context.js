import React, { useState, useEffect } from 'react';

// use this for app or component wise state
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
}); 


export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect( () => {
        const isLoggedInData = localStorage.getItem('isLoggedIn');
    
        if (isLoggedInData === '1'){
          setIsLoggedIn(true);
        }
    
      },[]);


    const logoutHandler = () => {
        // remove local data 
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        // set local data
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    };

    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }}>{props.children}
    </AuthContext.Provider>
};


export default AuthContext;

