import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContextProvider';

const Home = () => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin } = useContext(AuthContext);

    const handleLogout = () => {
        signOut(auth).then(() => {
            setIsAdmin(false);
            setIsLoggedIn(false);
            toast.success("Signed out");
        }).catch((error) => {
            toast.error(error.message);
        })
    }

    return (
        <div className='h-[100vh] flex flex-col justify-center items-center'>
             <div className='flex flex-col items-center mb-[2rem]'>
                <p className='text-[2.75rem] text-center mb-[2rem]'>Welcome! <br /></p>
                <p className='text-[1.5rem] text-gray-500'>
                    {(isLoggedIn && isAdmin) ? 
                        "Please click on the admin button to go to admin panel." : 
                        "Please log in to access the admin panel."
                    }
                </p>
            </div>

            <nav className='h-[--nav-height] flex items-center px-[2rem]'>
                <div className='flex gap-[1rem] items-center'>
                    {(isAdmin && isLoggedIn) && <button onClick={() => navigate('/admin')} className="h-[4rem] w-[12rem] shadow-sm text-[1.5rem] border rounded-full grid place-items-center">Admin Panel</button>}
                    {!isLoggedIn && <button onClick={() => navigate('/login')} className="h-[4rem] w-[12rem] text-[1.5rem] bg-blue-500 text-white custom-shadow rounded-full">Login</button>}
                    {isLoggedIn && <button onClick={handleLogout} className="h-[4rem] w-[12rem] text-[1.5rem] bg-blue-500 text-white custom-shadow rounded-full">Logout</button>}
                </div>
            </nav>
        </div>
    )
}

export default Home