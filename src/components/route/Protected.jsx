import { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';

const ProtectedRoute = ({ children }) => {

    const {isLoggedIn} = useContext(AuthContext);

    if(!isLoggedIn){
        return <Navigate to='/' replace />
    }

    return children;
}

export default ProtectedRoute;