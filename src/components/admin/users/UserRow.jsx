import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContextProvider";

// import components
import UpdateUserForm from "./UpdateUserForm";

const UserRow = ({ user, getUsers }) => {
    const [openUpdateUserForm, setOpenUpdateUserForm] = useState(false);

    const {currentUser} = useContext(AuthContext);

      // handleOpenUpdateDrawer
      const handleOpenUpdateDrawer = () => {
        if (currentUser.role === "staff") {
            return toast.error("You are not authorized to update data");
        }

        setOpenUpdateUserForm(true);
        // return toast("This feature for admin is coming soon.");
    }

    return (
        <tr className="border">
            <td className="p-[1.5rem] text-[1.35rem] ">{user.name ? user.name : "-"}</td>
            <td className="p-[1.5rem] text-[1.35rem] ">{user.email ? user.email : "-"}</td>
            <td className="p-[1.5rem] text-[1.35rem] ">{user.mobile_number ? user.mobile_number : "-"}</td>
            <td className="p-[1.5rem] text-[1.35rem] ">{user.role ? user.role : "-"}</td>
            <td className='p-[1.5rem] text-[1.35rem]'>
                <i onClick={handleOpenUpdateDrawer} className="fa-solid fa-pencil h-[2.5rem] w-[2.5rem] grid place-items-center cursor-pointer rounded-[0.5rem] bg-slate-100" ></i>
                <UpdateUserForm user={user} openUpdateUserForm={openUpdateUserForm} setOpenUpdateUserForm={setOpenUpdateUserForm} getUsers={getUsers}  />
            </td>
        </tr>
    )
}

export default UserRow