import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

import logo from '../../assets/logo.png'


const adminMenu = [
    {
        name: "Orders",
        url: 'orders',
        icon: "fa-solid fa-cart-shopping"
    },

    {
        name: "Products",
        url: 'products',
        icon: "fa-brands fa-product-hunt"
    },

    {
        name: "Stores",
        url: 'stores',
        icon: "fa-solid fa-store"
    },

    {
        name: "Users",
        url: 'users',
        icon: "fa-solid fa-users"
    },

    {
        name: "Home",
        url: '/',
        icon: "fa-solid fa-house"
    }
]

const Sidebar = ({ extend, setExtend, open, setOpen }) => {
    const [width, setWidth] = useState({width: window.innerWidth});
    const [activeMenu, setActiveMenu] = useState(adminMenu[0].name);

    const handleMenuClick = ({ name }) => {
        setActiveMenu(name)
        if (open) {
            setOpen(!open);
        }
    }

    return (
        <div className={`h-full w-full flex flex-col px-[2rem] bg-[#27374D] z-50`}>
            <div className={`h-[12.5rem] flex justify-center items-center item-center sm:justify-between`}>
                <img src={logo} alt="logo" className={`duration-200 ${extend ? "h-[6rem] w-[6rem] " : "h-[4rem] w-[4rem]"} sm:h-[4.5rem] sm:w-[4.5rem] object-cover`} />
                <i onClick={() => setOpen(!open)} className="fa-solid fa-chevron-left text-[2rem] text-[#ededed] cursor-pointer h-[3.5rem] w-[3.5rem] rounded-full bg-[#3C4D6F] duration-100 hidden sm:grid place-items-center"></i>
            </div>

            {adminMenu.map((menu, index) => {
                return (
                    <NavLink
                        // onClick={() => setActiveMenu(menu.name)} 
                        onClick={() => handleMenuClick(menu)}
                        style={menu.name === activeMenu ? { background: "#3C4D6F" } : null}
                        key={index}
                        to={menu.url}
                        className={`mb-[1rem] p-[1.25rem] text-[#ededed] rounded-[0.5rem] flex last:mt-auto last:bg-[#3c4d6f] hover:bg-[#3C4D6F]`}
                    >
                        <i className={`${menu.icon} text-[#ededed]} h-[2.5rem] text-[1.5rem] grid place-items-center`}></i>
                        <span className={`h-[2.5rem] text-[1.5rem] ml-[2rem] text-[#ededed] ${!extend && "ml-[4rem] opacity-0 sm:opacity-100"} duration-300 transition-all ease sm:inline-flex`}>{menu.name}</span>
                    </NavLink>
                );
            })}
        </div>
    )
}

export default Sidebar