import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    // submit handler
    const submitHandler = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Processing...");

        if (!email) {
            return toast.error("Please provide the email.", { id: toastId });
        }

        const usersRef = collection(db, "users");
        const usersQuery = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(usersQuery);

        if (!querySnapshot.empty) {
            sendPasswordResetEmail(auth, email);
            toast.success(`Password reset email sent to ${email}.`, { id: toastId });
            setEmail('');
        } else {
            toast.error(`${email} is not registered.`, { id: toastId })
        }
    };

    return (
        <form className='h-[100vh] px-[2rem] flex flex-col justify-center items-center relative' onSubmit={submitHandler}>
            <div className="w-full text-center mb-10">
                <h2 className='text-[2.5rem]'>Forgot Password?</h2>
                <span className='text-[1.5rem] text-gray-500'>Please, provide the email with which you created account. </span>
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

            <button type='submit' className="w-[40rem] text-[1.5rem] bg-blue-500 text-[#fff] px-[3rem] py-[1rem] rounded-[0.5rem] mb-[1rem] shadow-lg">
                Submit
            </button>

            <i onClick={() => navigate('/')} className='fa-solid fa-chevron-left absolute top-[4rem] left-[4rem] h-[4rem] w-[4rem] cursor-pointer text-[1.5rem] bg-gray-100 hover:bg-gray-200 duration-150 grid place-items-center rounded-full'></i>
        </form>
    )
}

export default ForgotPassword;