import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    userId: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
    setUserId: (userID) => {}
});

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const initialUserId = localStorage.getItem('userId');
    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(initialUserId);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token)
    };

    const logoutHandler = () => {
        setToken(null);
        setUserId(null)
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    const setUserIdHandler = (userId) => {
        setUserId(userId)
        localStorage.setItem('userId', userId)
    }

    const contextValue = {
        token: token,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        setUserId: setUserIdHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;