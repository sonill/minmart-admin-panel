import { useState } from "react";
import { db } from "../../../firebase"
import { useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore"

// import components
import OrderDetail from "./OrderDetail";

const Orders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const getOrders = async () => {
        const allOrdersQuerySnapshot = await getDocs(collection(db, 'all_orders'));

        const allOrdersData = await Promise.all(allOrdersQuerySnapshot.docs.map(async (doc) => {
            const allOrdersDocData = doc.data();
            const ordersQuerySnapshot = await getDocs(collection(doc.ref, 'orders'));
            const ordersData = ordersQuerySnapshot.docs.map((orderDoc) => orderDoc.data());
            return { ...allOrdersDocData, orders: ordersData };
        }));

        // console.log("all", allOrdersData)
        // console.log("0",allOrdersData[0].orders)
        // console.log("1",allOrdersData[1].orders) 

        setAllOrders(allOrdersData);
    };

    // useEffect
    useEffect(() => {
        getOrders();
    }, []);


    return (
        <div className='w-full flex flex-col border rounded-[0.5rem] overflow-hidden'>
            <table className="w-[100%] border-spacing-0">
                <thead>
                    <tr className="bg-[#ededed]">
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Store Name</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Orders Count</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Detail</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        allOrders[0] && allOrders.map((order, index) => {
                            return (
                                <tr key={index} className="border-b last:border-0">
                                    <td className='p-[1.5rem] text-[1.35rem]'>{order?.store_name}</td>
                                    <td className='p-[1.5rem] text-[1.35rem]'>{order?.order_count}</td>
                                    <td>
                                        <i
                                            onClick={() => setOpenDialog(!openDialog)}
                                            className="fa-solid fa-eye p-[1.5rem] text-[1.35rem] cursor-pointer text-gray-600 hover:text-black hover:scale-[1.25] duration-100">
                                        </i>

                                        <OrderDetail openDialog={openDialog} setOpenDialog={setOpenDialog} orders={order.orders} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody >
            </table>
        </div>
    )
}

export default Orders