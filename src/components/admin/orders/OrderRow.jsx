import { useState } from "react";

// import components
import OrderDetailDrawer from "./OrderDetailDrawer";

const OrderRow = ({ order }) => {
    const [orderDetailDrawer, setOrderDetailDrawer] = useState(false);

    return (
        <tr className="border">
            <td className='p-[1.5rem] text-[1.35rem]'>{order?.store_name}</td>
            <td className='p-[1.5rem] text-[1.35rem]'>{order?.order_count}</td>
            <td className='p-[1.5rem] text-[1.35rem]'>
                <i onClick={() => setOrderDetailDrawer(true)} className="fa-solid fa-plus h-[2.5rem] w-[2.5rem] grid place-items-center cursor-pointer rounded-[0.5rem] bg-slate-100" ></i>
                <OrderDetailDrawer title={`Orders of ${order.store_name}`} orderDetailDrawer={orderDetailDrawer} setOrderDetailDrawer={setOrderDetailDrawer} orders={order.orders} />
            </td>
        </tr>
    )
}

export default OrderRow