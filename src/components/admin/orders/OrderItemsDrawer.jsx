import moment from 'moment/moment'
import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'

const OrderItemsDrawer = ({openOrderItemsDrawer, setOpenOrderItemsDrawer, orderItems }) => {

    return (
        <>
            <div
                onClick={(e) => {
                    if (e.target.id === "overlay") {
                        setOpenOrderItemsDrawer(false)
                    }
                }}
                id="overlay"
                className={`${openOrderItemsDrawer ? "visible" : "hidden"} absolute top-0 right-0 bottom-0 left-0 bg-gray-500 bg-opacity-50 transition-all ease-out duration-200`}
            >
            </div>

            <div className={` ${openOrderItemsDrawer ? 'top-[0]' : 'top-[100%]'} w-[100%] p-[2rem] absolute top-0 left-0 h-full transition-all ease-in-out duration-300 z-[60] bg-white `} >
                <div className='flex justify-between items-center mb-[1rem]'>
                    <h1 className='text-[1.8rem] font-bold'>Order Items</h1>
                  
                    <button onClick={() => setOpenOrderItemsDrawer(false)} className="h-[3.5rem] w-[8rem] text-[1.25rem] bg-gray-600 text-white custom-shadow rounded-[0.5rem]">
                        <i className="fa-solid fa-xmark mr-[1rem]"></i>
                        Close
                    </button>
                </div>

                <table className="table-auto w-[100%] rounded-[0.5rem] overflow-hidden custom-shadow">
                    <thead>
                        <tr className="bg-[#ededed]">
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Item Name</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Price (Rs)</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Quantity</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Unit Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orderItems[0] && orderItems.map((item, index) => (
                            <tr key={index} className="border">
                                <td className="p-[1.5rem] text-[1.35rem]">{item.itemName}</td>
                                <td className="p-[1.5rem] text-[1.35rem]">{item.price}</td>
                                <td className="p-[1.5rem] text-[1.35rem]">{item.quantity}</td>
                                <td className="p-[1.5rem] text-[1.35rem]">{item.unitType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default OrderItemsDrawer