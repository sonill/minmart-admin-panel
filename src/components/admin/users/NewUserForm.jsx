import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { auth } from "../../../firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContextProvider";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const NewUserForm = ({ openNewUserForm, setOpenNewUserForm, getUsers }) => {
    // context
    const { currentUser } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [role, setRole] = useState("admin");
    const [showPassword, setShowPassword] = useState(false);

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setName("");
        setNumber("");
        setRole("");
        setConfirmPassword("");
    };

    const handleClose = () => {
        setOpenNewUserForm(false);
        resetForm();
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Processing...");

        if (!email || !password || !name || !role || !number || !confirmPassword) {
            return toast.error("Please fill in all the fields.", { id: toastId });
        }

        if (password !== confirmPassword) {
            return toast.error("Password do not match.", { id: toastId });
        }

        try {

            //add new user
            const newUserCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const newUserUid = newUserCredentials.user.uid;
            await setDoc(doc(db, "users", newUserUid), { name, email, role, mobile_number: number });
            signOut(auth);

            await signInWithEmailAndPassword(auth, currentUser.email, JSON.parse(localStorage.getItem("randomvalue")));

            getUsers();
            handleClose();
            toast.success("User added successfully.", { id: toastId });

        } catch (err) {
            console.log(err)
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
    };

    return (
        <>
            {openNewUserForm && (
                <div
                    onClick={(e) => {
                        if (e.target.id === "overlay") {
                            handleClose();
                        }
                    }}
                    id="overlay"
                    className=" absolute top-0 right-0 bottom-0 left-0 bg-gray-500 bg-opacity-50 transition-all ease-out duration-200"
                ></div>
            )}

            <div className={`${openNewUserForm ? "right-[0]" : "right-[-42.5rem]"} w-[42.5rem]  p-[2rem] flex flex-col justify-top  bg-gray-100 absolute top-0 bottom-0 h-full transition-all ease-in-out duration-300 z-[50]`} >
                <div className="flex justify-between items-center mb-[2rem]">
                    <h1 className="text-[2rem] font-bold ">Add New User</h1>
                    <i onClick={handleClose} className="fa-solid fa-xmark text-[2rem] cursor-pointer" ></i>
                </div>

                <form onSubmit={submitHandler} className="flex flex-col gap-[1rem]" >
                    <div className="flex flex-col gap-[0.5rem]">
                        <label className="text-[1.25rem] text-gray-500">Name</label>
                        <input
                            name="name"
                            type="text"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]"
                        />
                    </div>

                    <div className="flex flex-col gap-[0.5rem]">
                        <label className="text-[1.25rem] text-gray-500">Email</label>
                        <input
                            name="email"
                            type="text"
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]"
                        />
                    </div>

                    <div className="flex flex-col gap-[0.5rem]">
                        <label className="text-[1.25rem] text-gray-500">Mobile Number</label>
                        <input
                            name="number"
                            type="text"
                            value={number}
                            maxLength={10}
                            onChange={(e) => setNumber(e.target.value)}
                            className="border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]"
                        />
                    </div>

                    <div className="flex flex-col gap-[0.5rem] relative">
                        <label className="text-[1.25rem] text-gray-500">Password</label>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]"
                        />
                        {showPassword && <i onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>}
                        {!showPassword && <i onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye-slash absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>}
                    </div>

                    <div className="flex flex-col gap-[0.5rem] relative">
                        <label className="text-[1.25rem] text-gray-500"> Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem]"
                        />
                        {showPassword && <i onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>}
                        {!showPassword && <i onClick={() => setShowPassword(!showPassword)} className="fa-solid fa-eye-slash absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>}
                    </div>

                    <div className="flex flex-col gap-[0.5rem]">
                        <label className="text-[1.25rem] text-gray-500">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="bg-gray-200 rounded-[0.5rem]  p-[1rem] text-[1.5rem]"
                        >
                            <option value="admin" className="bg-white">Admin</option>
                            <option value="staff" className="bg-white">Staff</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="mt-[1rem] text-[1.5rem] bg-blue-500 transition-all ease duration-200 text-[#fff] px-[3rem] py-[1rem] rounded-[0.5rem] shadow-lg"
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    );
};

export default NewUserForm;