import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const submitHandler = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Processing...");

        if (!email || !password) {
            return toast.error("Please fill in all the fields.", { id: toastId });
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Logged in successfully!", { id: toastId });
            // navigate to admin panel
            navigate('/admin'); 
        } catch (err) {
            console.log(err.code)
            let errorMessage;
            switch (err.code) {
                case "auth/invalid-email":
                    errorMessage = "Invalid email.";
                    break;
                case "auth/user-not-found":
                case "auth/wrong-password":
                    errorMessage = "Invalid credentials";
                    break;
                default:
                    errorMessage = "An error occurred. Please try again.";
                    break;
            }
            toast.error(errorMessage, { id: toastId });
        }
    };




    return (
        <form className='h-[100vh] px-[2rem] flex flex-col justify-center items-center border' onSubmit={submitHandler}>
            <div className="w-full text-center mb-10">
                <h2 className='text-[2.75rem]'>Login</h2>
                <span className='text-[1.5rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
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

            <div className='w-[40rem] mb-[2rem] flex justify-between'>
                <div>
                    <input type='radio' className='h-[1.5rem] w-[1.5rem] mr-2 text-[1.5rem]' />
                    <span className='text-[1.5rem]'>Remember me?</span>
                </div>
                <Link to="#" className='text-blue-500 text-[1.5rem]'>Forgot password?</Link>
            </div>

            <button type='submit' className="w-[40rem] bg-gradient-to-r text-[1.5rem] from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-[#fff] px-[3rem] py-[1rem] rounded-[0.5rem] mb-[1rem] shadow-lg">
                Login
            </button>

            <div className='text-center text-gray-500 flex justify-center mt-[1rem]'>
                <p className='mr-[0.5rem] text-[1.45rem]'>Dont have an account? Click here to</p>
                <button type='button' onClick={() => navigate('/register')} className='text-[1.45rem] hover:cursor-pointer bg-transparent underline'>register</button>
            </div>
        </form>
    )
}

export default Login;