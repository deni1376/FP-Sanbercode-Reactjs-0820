import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const iniateUser = currentUser ? currentUser : null
    const [user, setUser] = useState(iniateUser);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};

// export default AuthContext = createContext();

// export default AuthProvider = (props) => {
//     const [isLogin, login] = useState(false);

//     const setIsLogin = (val) => {
//         login(val);
//     };

//     return (
//         <AuthContext.Provider value={[isLogin, setIsLogin]}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }

// export {
//     UserContext, UserProvider, AuthContext, AuthProvider
// }