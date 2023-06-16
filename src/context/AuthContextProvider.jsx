import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

// create an auth context
export const AuthContext = createContext(null);

// create auth context provider
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // value object
    const value = {
        isLoggedIn,
        setIsLoggedIn,
        isAdmin,
        setIsAdmin,
        currentUser
    };

    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            if(currentUser !== null){
                try{
                    const uid = currentUser.uid;
                    const docSnapshot = await getDoc(doc(db, "users", uid));
                    const userData = docSnapshot.data();

                    setCurrentUser(userData);

                    setIsLoggedIn(true);

                    if(userData.role === "admin"){
                        setIsAdmin(true);
                    }
                }catch (err){
                    toast.error(err.message);
                }
            }
        });
    }, []);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}