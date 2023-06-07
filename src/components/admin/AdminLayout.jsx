import { useState } from "react"
import { Outlet } from "react-router-dom"
import { auth } from "../../firebase";

// import components
import Sidebar from "./Sidebar";
import { onAuthStateChanged } from "firebase/auth";

const AdminLayout = () => {
    const [open, setOpen] = useState(false);
    const [extend, setExtend] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState({});

    onAuthStateChanged(auth , (currrentUser) => {
        setLoggedInUser(currrentUser)
    });

    return (
        <div className={`h-auto overflow-hidden flex relative w-full transition-all duration-200 ${extend ? "pl-[var(--admin-sidebar-lg)]" : "pl-[var(--admin-sidebar-sm)]"} sm:pl-0`}>
            <div className={`fixed top-0 left-0 bottom-0 h-full transition-all duration-200 ${extend ? 'w-[var(--admin-sidebar-lg)]' : 'w-[var(--admin-sidebar-sm)]'} sm:w-[30rem] sm:fixed sm:top-0 ${open ? 'sm:left-0' : 'sm:left-[-30rem]'}`}>
                <Sidebar open={open} setOpen={setOpen} extend={extend} setExtend={setExtend} />
            </div>

            <div className="w-[100%] min-h-[100vh] flex flex-col">
                <div className="h-[var(--nav-height)] px-[2rem] border shadow-sm flex items-center justify-between">
                    <div>
                        <i onClick={() => setOpen(!open)} className="fa-solid fa-bars text-[2rem] cursor-pointer hidden sm:flex"></i>
                        <i onClick={() => setExtend(!extend)} className={`${extend ? "fa-solid fa-arrow-left-long" : "fa-solid fa-bars"} text-[2rem] cursor-pointer sm:hidden`} ></i>
                    </div>

                    <div className="flex items-center">
                        {/* <img className="h-[4rem] w-[4rem] rounded-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="profile" /> */}
                        {loggedInUser?.email && <p className="ml-4 text-[1.5rem]">You are logged in as {loggedInUser.email}</p>}
                    </div>
                </div>

                <div className="h-full p-[2rem] overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout