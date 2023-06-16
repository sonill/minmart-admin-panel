import { signInWithEmailAndPassword } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContextProvider';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { isLoggedIn } = useContext(AuthContext)

    // submit handler
    const submitHandler = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Processing...");

        if (!email || !password) {
            return toast.error("Please fill in all the fields.", { id: toastId });
        }

        try {
            // sensitive
            localStorage.setItem('randomvalue', JSON.stringify(password));

            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
            toast.success("Logged in successfully!", { id: toastId });
        } catch (err) {
            let errorMessage;
            switch (err.code) {
                case "auth/invalid-email":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    errorMessage = "Invalid credentials.";
                    break;

                default:
                    errorMessage = "An error occurred. Please try again.";
                    break;
            }
            toast.error(errorMessage, { id: toastId });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            return navigate('/admin/orders');
        }
    }, [isLoggedIn, navigate]);

    return (
        <form className='h-[100vh] px-[2rem] flex flex-col justify-center items-center relative' onSubmit={submitHandler}>
            <div className="w-full text-center mb-10">
                <h2 className='text-[2.75rem]'>Login</h2>
                <span className='text-[1.5rem] text-gray-500'>Please, log in to access admin panel.</span>
            </div>

            <div className="w-[40rem] mb-[1.5rem] flex flex-col gap-[0.5rem]">
                <label className='text-[1.45rem] text-gray-500'>Email</label>
                <input
                    name="email"
                    type="text"
                    autoComplete='off'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className='border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]'
                />
            </div>

            <div className="w-[40rem] mb-[1.5rem] flex flex-col gap-[0.5rem] relative">
                <label className='text-[1.45rem] text-gray-500'>Password</label>
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete='new-password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem] relative pr-[5rem]'
                />

                {showPassword && <i onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>}
                {!showPassword && <i onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye-slash absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>}
            </div>

            <div className='w-[40rem] mb-[2rem] flex'>
                <Link to="/forgot-password" className='text-blue-500 text-[1.5rem]'>Forgot password?</Link>
            </div>

            <button type='submit' className="w-[40rem] text-[1.5rem] bg-blue-500 text-[#fff] px-[3rem] py-[1rem] rounded-[0.5rem] mb-[1rem] shadow-lg">
                Login
            </button>
        </form>
    )
}

export default Login;