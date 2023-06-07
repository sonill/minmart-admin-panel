import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { doc, setDoc } from 'firebase/firestore';

const RegiterForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [data, setData] = useState({ contact_person: "", email: "", password: "", mobile_number: "", company_name: "", company_address: "", company_pan: "" })

    // handle change
    const handleChange = (e) => { setData({ ...data, [e.target.name]: e.target.value }) }

    // submit handler
    const submitHandler = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Processing...");

        const { contact_person, email, password, mobile_number, company_name, company_address, company_pan } = data;

        if (!contact_person || !email || !password || !mobile_number || !company_name || !company_address || !company_pan) {
            return toast.error("Please fill in all the fields.", { id: toastId });
        }

        if (password != confirmPassword) {
            return toast.error("Password do not match.", { id: toastId });
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            const additionalData = {
                company_name: data.company_name,
                company_address: data.company_address,
                company_pan: data.company_pan,
                email: data.email,
                contact_person: data.contact_person,
                mobile_number: data.mobile_number
            };

            await setDoc(doc(db, "users", uid), additionalData);

            // toast.success("Registered successfully!", { id: toastId });
        } catch (err) {
            console.log(err.message)

            let errorMessage;
            switch (err.code) {
                case "auth/invalid-email":
                    errorMessage = "Invalid email.";
                    break;

                case "auth/weak-password":
                    errorMessage = "Password should be at least 6 characters long.";
                    break;

                case "auth/email-already-in-use":
                    errorMessage = "The email address is already in use.";
                    break;

                default:
                    errorMessage = "An error occurred. Please try again.";
                    break;
            }

            toast.error(errorMessage, { id: toastId });
        }

    }



    return (
        <form className='h-[100vh] px-[2rem] flex flex-col gap-[1rem] justify-center items-center' onSubmit={submitHandler}>
            <div className="w-full text-center mb-10">
                <h2 className='text-[2.75rem]'>Register</h2>
                <span className='text-[1.5rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
            </div>

            <div className='grid grid-cols-2 gap-x-[1rem]'>

                <div className="w-[40rem] mb-[1.5rem] flex flex-col gap-[0.5rem]">
                    <label className='text-[1.45rem] text-gray-500'>Contact Person</label>
                    <input
                        name="contact_person"
                        type="text"
                        autoComplete='off'
                        value={data.contact_person}
                        onChange={handleChange}
                        className='border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]'
                    />
                </div>

                <div className="w-[40rem] mb-[1.5rem] flex flex-col gap-[0.5rem]">
                    <label className='text-[1.45rem] text-gray-500'>Email</label>
                    <input
                        name="email"
                        type="text"
                        autoComplete='off'
                        value={data.email}
                        onChange={handleChange}
                        className='border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]'
                    />
                </div>

                <div className="w-[40rem] mb-[1.5rem] flex flex-col gap-[0.5rem] relative">
                    <label className='text-[1.45rem] text-gray-500'>Password</label>
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete='new-password'
                        value={data.password}
                        onChange={handleChange}
                        className='border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]'
                    />
                    {showPassword && <i onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>}
                    {!showPassword && <i onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye-slash absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>}
                </div>


                <div className="w-[40rem] mb-[1.5rem] flex flex-col gap-[0.5rem] relative">
                    <label className='text-[1.45rem] text-gray-500'>Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete='new-password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className='border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem] pr-[5rem]'
                    />
                    {showPassword && <i onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>}
                    {!showPassword && <i onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye-slash absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>}
                </div>

                <div className="w-[40rem] mb-[1.5rem] flex flex-col gap-[0.5rem]">
                    <label className='text-[1.45rem] text-gray-500'>Contact Person</label>
                    <input
                        name="contact_person"
                        type="text"
                        autoComplete='off'
                        value={data.contact_person}
                        onChange={handleChange}
                        className='border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]'
                    />
                </div>


                <div className="w-[40rem] mb-[1.5rem] flex flex-col gap-[0.5rem]">
                    <label className='text-[1.45rem] text-gray-500'>Company Name</label>
                    <input
                        name="company_name"
                        type="text"
                        autoComplete='off'
                        value={data.company_name}
                        onChange={handleChange}
                        className='border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]'
                    />
                </div>

                <div className="w-[40rem] mb-[1.5rem] flex flex-col gap-[0.5rem] relative">
                    <label className='text-[1.45rem] text-gray-500'>Company Address</label>
                    <input
                        name="company_address"
                        type="text"
                        autoComplete='off'
                        value={data.company_address}
                        onChange={handleChange}
                        className='border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]'
                    />
                </div>

                <div className="w-[40rem] mb-[1.5rem] flex flex-col gap-[0.5rem] relative">
                    <label className='text-[1.45rem] text-gray-500'>Company Pan</label>
                    <input
                        name="company_pan"
                        type="text"
                        autoComplete='new-password'
                        value={data.company_pan}
                        onChange={handleChange}
                        className='border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem] pr-[5rem]'
                    />
                </div>
            </div>

            <button type='submit' className="w-[40rem] bg-gradient-to-r text-[1.5rem] bg-blue-500 transition-all ease duration-200 text-[#fff] px-[3rem] py-[1rem] rounded-[0.5rem] mb-[1rem] shadow-lg">
                Register
            </button>

            <div className='text-center text-gray-500 flex justify-center mt-[1rem]'>
                <p className='mr-[0.5rem] text-[1.45rem]'>Already have an account? Click here to</p>
                <button type='button' onClick={() => navigate('/login')} className='text-[1.45rem] hover:cursor-pointer bg-transparent underline'>login</button>
            </div>
        </form>
    )
}

export default RegiterForm;