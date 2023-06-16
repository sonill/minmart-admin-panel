import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../../firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"

// import components
import OrderRow from "./OrderRow";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);

    const getOrders = async () => {
        const allOrdersQuerySnapshot = await getDocs(collection(db, 'all_orders'));

        const allOrdersData = await Promise.all(allOrdersQuerySnapshot.docs.map(async (doc) => {
            const allOrdersDocData = doc.data();
            const ordersQuerySnapshot = await getDocs(query(collection(doc.ref, 'orders'), orderBy('date', 'desc')));
            const ordersData = ordersQuerySnapshot.docs.map((orderDoc) => orderDoc.data());
            return { ...allOrdersDocData, orders: ordersData };
        }));

        setAllOrders(allOrdersData);
    };

    // useEffect
    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>
            <table className="table-auto w-[100%] rounded-[0.5rem] overflow-hidden custom-shadow">
                <thead>
                    <tr className="text-justify bg-[#ededed] text-[1.45rem]">
                        <th className="p-[1.5rem]">Store Name</th>
                        <th className="p-[1.5rem]">Orders Count</th>
                        <th className="p-[1.5rem]">Detail</th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        allOrders[0] && allOrders.map((order, index) => (
                            <OrderRow order={order} key={index} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllOrders