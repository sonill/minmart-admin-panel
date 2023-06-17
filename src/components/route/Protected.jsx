import { useContext } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children }) => {

    const { isLoggedIn, isActive, setIsLoggedIn, setIsAdmin } = useContext(AuthContext);

    const navigate = useNavigate();

    if (!isLoggedIn) {
        return <Navigate to='/' replace />
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('randomvalue');
            setIsAdmin(false);
            setIsLoggedIn(false);
            toast.success("You have signed out successfully.");
            navigate('/');
            return;
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    if (!isActive) {
        return (
            <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Your account is disabled by admin</h1>
                    <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded" onClick={handleLogout}>Sign out.</button>
                </div>
            </div>
        );
    }

    return children;
}

export default ProtectedRoute;