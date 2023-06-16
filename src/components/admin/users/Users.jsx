import { useState, useEffect, useContext } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContextProvider";

// import components
import UserRow from "./UserRow";
import NewUserForm from "./NewUserForm";
import { toast } from "react-hot-toast";

const Users = () => {

    // context
    const { currentUser } = useContext(AuthContext);

    // states
    const [users, setUsers] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [openNewUserForm, setOpenNewUserForm] = useState(false);

    // get users
    const getUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs
            .map((doc) => {
                const uid = doc.id;
                const userData = doc.data();
                return {uid, ...userData};
            })
            .filter((user) => user.role === "admin" || user.role === "staff")
            .filter((user) => user.email.toLowerCase().includes(keyword.toLowerCase()));
        setUsers(usersData);
    };

    // handleOpenNewUserDrawer
    const handleOpenNewUserDrawer = () => {
        if (currentUser.role === "staff") {
            return toast.error("You are not authorized to create new user.");
        }

        setOpenNewUserForm(true);
    }

    useEffect(() => {
        getUsers();
    }, [keyword]);


    return (
        <>
            <div className="w-[100%] flex pb-[1.5rem]">
                <div className="mr-auto relative flex items-center text-[1.25rem] rounded-[0.5rem]">
                    <input
                        placeholder="Quick search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="h-[4rem] border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem] pr-[5rem]"
                    />

                    {!keyword && (
                        <i className="fa-solid fa-magnifying-glass absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>
                    )}

                    {keyword && (
                        <i
                            onClick={() => setKeyword("")}
                            className="fa-solid fa-xmark absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"
                        ></i>
                    )}

                </div>

                <button
                    onClick={handleOpenNewUserDrawer}
                    className="text-white bg-blue-500 hover:bg-blue-600 mr-[1rem] custom-shadow flex items-center text-[1.25rem] duration-150 text-[#b2eb5] px-[2rem] py-[1rem] rounded-[0.5rem]"
                >
                    <i className="fa-solid fa-plus text-white"></i>
                    <p className="ml-[1rem]">Add User</p>
                </button>
            </div>

            <div className="w-full flex flex-col border rounded-[0.5rem] overflow-hidden">
                <table className="w-[100%] border-spacing-0">
                    <thead>
                        <tr className="bg-[#ededed]">
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Name</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Email</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Contact</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Role</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users[0] && users.map((user, index) => (
                            <UserRow user={user} key={index} getUsers={getUsers} />
                        ))}
                    </tbody>
                </table>

                <NewUserForm openNewUserForm={openNewUserForm} setOpenNewUserForm={setOpenNewUserForm} getUsers={getUsers} />
            </div>
        </>
    );
};

export default Users;