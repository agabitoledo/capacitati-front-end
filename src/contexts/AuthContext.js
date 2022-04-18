import React, { createContext, useReducer, useState, useEffect} from 'react';

const userInfoReducer = (prev, newValue) => {
    if(!newValue){
        localStorage.removeItem('userInfo');
        return null
    }
    localStorage.setItem('userInfo', JSON.stringify(newValue));
    return newValue;
};

const AuthContext = createContext({});

const AuthContextProvider = ({children}) => {
    const [userInfo, setUserInfo] = useReducer(userInfoReducer, JSON.parse(localStorage.getItem('userInfo')));
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      if (userInfo && userInfo.token ) {
          setIsAdmin(true);
      } else {
          setIsAdmin(false)
      }
    }, [userInfo])
    
    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext, AuthContextProvider};