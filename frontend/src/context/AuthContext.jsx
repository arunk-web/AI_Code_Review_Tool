import { createContext , useState, useContext } from 'react';

const AuthContext = createContext();
//"Ek naya context banaya AuthContext naam ka — ye ek khali dabba hai abhi, isme baad mein user ki info dalenge. Ye line sirf dabba banati hai"

export const AuthProvider   = ({children}) => {
    const [user,setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

    const login = (userData, token) => {
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(userData));
        setUser(userData);
    };


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user,login,logout}} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
//"ye ek custom hook hai — shortcut jaisa. Bina iske har component mein ye likhna padta:
//const { user, login, logout } = useContext(AuthContext);
// useAuth() se seedha likh sakte hain:
// const { user, login, logout } = useAuth();



///"Socho ek school hai — Principal ka office hai jahan sab students ki information hai. Koi bhi teacher kisi bhi class mein jaake pooch sakta hai 'ye student registered hai ya nahi'. AuthContext bilkul aisa hi hai — ek jagah user ki login information rakho, poori app mein koi bhi component use kar sake"



