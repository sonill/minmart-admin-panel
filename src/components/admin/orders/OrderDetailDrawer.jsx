import moment from 'moment/moment'
import { useState } from 'react'

// import component
import OrderItemsDrawer from './OrderItemsDrawer'

const OrderDetailDrawer = ({ title, orderDetailDrawer, setOrderDetailDrawer, orders }) => {
    const [openOrderItemsDrawer, setOpenOrderItemsDrawer] = useState(false);

    return (
        <>
            <div
                onClick={(e) => {
                    if (e.target.id === "overlay") {
                        setOrderDetailDrawer(false)
                    }
                }}
                id="overlay"
                className={`${orderDetailDrawer ? "visible" : "hidden"} absolute top-0 right-0 bottom-0 left-0 bg-gray-500 bg-opacity-50 transition-all ease-out duration-200`}
            >
            </div>

            <div className={` ${orderDetailDrawer ? 'top-[0]' : 'top-[100%]'} w-[100%] p-[2rem] absolute top-0 left-0 h-full transition-all ease-in-out duration-300 z-[50] bg-white `} >
                <div className='flex justify-between items-center mb-[1rem]'>
                    <h1 className='text-[1.8rem] font-bold'>{title}</h1>
                    <button onClick={() => setOrderDetailDrawer(false)} className="h-[3.5rem] w-[8rem] text-[1.25rem] bg-gray-600 text-white custom-shadow rounded-[0.5rem]">
                        <i className="fa-solid fa-xmark mr-[1rem]"></i>
                        Close
                    </button>

                </div>

                <table className="table-auto w-[100%] rounded-[0.5rem] overflow-hidden custom-shadow">
                    <thead>
                        <tr className="bg-[#ededed]">
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Date</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Status</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Total</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Order Items</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders[0] && orders.map((odr, index) => (
                            <tr key={index} className="border">
                                <td className="p-[1.5rem] text-[1.35rem]">{moment(odr.date).format('YYYY-MM-DD HH:mm A')}</td>
                                <td className="p-[1.5rem] text-[1.35rem]">{odr.status}</td>
                                <td className="p-[1.5rem] text-[1.35rem]">{odr.total}</td>
                                <td className="p-[1.5rem] text-[1.35rem]">
                                    <i onClick={() => setOpenOrderItemsDrawer(true)} className="fa-solid fa-plus  h-[2.5rem] w-[2.5rem] grid place-items-center cursor-pointer rounded-[0.5rem] bg-slate-100" ></i>
                                    <OrderItemsDrawer openOrderItemsDrawer={openOrderItemsDrawer} setOpenOrderItemsDrawer={setOpenOrderItemsDrawer} orderItems={odr.orderItems} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default OrderDetailDrawer