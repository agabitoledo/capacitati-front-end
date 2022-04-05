import React from 'react';

const userInfoReducer = (prev, newValue) => {
    if(!newValue){
        localStorage.removeItem('userInfo');
        return null
    }
    localStorage.setItem('userInfo', JSON.stringify(newValue));
    return newValue;
};

const AuthContext = React.createContext({});

const AuthContextProvider = ({children}) => {
    const [userInfo, setUserInfo] = React.useReducer(userInfoReducer, JSON.parse(localStorage.getItem('userInfo')));
    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext, AuthContextProvider};