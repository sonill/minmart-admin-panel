import { useState } from "react";

// import components
import OrderDetailDrawer from "./OrderDetailDrawer";

const OrderRow = ({ order, getOrders }) => {
    const [orderDetailDrawer, setOrderDetailDrawer] = useState(false);

    return (

        <>

            {
                order && order.order_count > 0 && (

                    <tr className="border">
                        <td className='p-[1.5rem] '>{order?.store_name}</td>
                        <td className='p-[1.5rem] '>{order?.order_count}</td>
                        <td className='p-[1.5rem] '>
                            <i onClick={() => setOrderDetailDrawer(true)} className="fa-solid fa-plus h-[2.5rem] w-[2.5rem] grid place-items-center cursor-pointer rounded-[0.5rem] bg-slate-100" ></i>
                            <OrderDetailDrawer title={`Orders of ${order.store_name}`} store_name={order.store_name} store_id={order.store_id} orderDetailDrawer={orderDetailDrawer} setOrderDetailDrawer={setOrderDetailDrawer} orders={order.orders} getOrders={getOrders} />
                        </td>
                    </tr>
                )
            }
        </>
    )
}

export default OrderRow