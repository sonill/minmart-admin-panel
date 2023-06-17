import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContextProvider";
import { getDocs, collection, getFirestore, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

// import components
import UpdateUserForm from "./UpdateUserForm";

const UserRow = ({ user, getUsers }) => {
    const [openUpdateUserForm, setOpenUpdateUserForm] = useState(false);

    const { currentUser } = useContext(AuthContext);

    // handleOpenUpdateDrawer
    const handleOpenUpdateDrawer = () => {
        if (currentUser.role === "staff") {
            return toast.error("You are not authorized to update data");
        }

        setOpenUpdateUserForm(true);
        // return toast("This feature for admin is coming soon.");
    }

    // change status of selected user.
    const updateUserStatus = async (user) => {

        const toastId = toast.loading("Something went wrong. Please refresh the page and try again.");
        const userRef = doc(db, "users", user?.uid);

        try {
            let is_active = user['active'];
            await updateDoc(userRef, { active: !is_active });
            getUsers();

            toast.success("User status is changed.", { id: toastId });

        } catch (err) {


            toast.error(errorMessage, { id: toastId });
        }

    }


    return (
        <tr className="border">
            <td className="p-[1.5rem]  ">{user.name ? user.name : "-"}</td>
            <td className="p-[1.5rem]  ">{user.email ? user.email : "-"}</td>
            <td className="p-[1.5rem]  ">{user.mobile_number ? user.mobile_number : "-"}</td>
            <td className="p-[1.5rem]  ">{user.role ? user.role : "-"}</td>
            <td className="p-[1.5rem]  "><a role="button" onClick={() => updateUserStatus(user)} className={(user.active ? " bg-green-500 " : "bg-red-500 ") + " px-4 py-2 text-white rounded-full"}>{user.active ? 'Active' : "Not Active"}</a></td>
            <td className='p-[1.5rem] '>
                <i onClick={handleOpenUpdateDrawer} className="fa-solid fa-pencil h-[2.5rem] w-[2.5rem] grid place-items-center cursor-pointer rounded-[0.5rem] bg-slate-100" ></i>
                <UpdateUserForm user={user} openUpdateUserForm={openUpdateUserForm} setOpenUpdateUserForm={setOpenUpdateUserForm} getUsers={getUsers} />
            </td>
        </tr>
    )
}

export default UserRow