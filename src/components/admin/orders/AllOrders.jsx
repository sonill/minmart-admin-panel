import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../../firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import TableOuter from "../TableOuter";

// import components
import OrderRow from "./OrderRow";

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);

    const getOrders = async () => {

        const allOrdersQuerySnapshot = await getDocs(collection(db, 'all_orders'));

        const allOrdersData = await Promise.all(allOrdersQuerySnapshot.docs.map(async (doc) => {
            const allOrdersDocData = doc.data();
            const ordersQuerySnapshot = await getDocs(query(collection(doc.ref, 'orders'), orderBy('date', 'desc')));
            const ordersData = ordersQuerySnapshot.docs.map((orderDoc) => {
                const orderData = orderDoc.data();
                const orderID = orderDoc.id; // Retrieve the document ID
                return { id: orderID, ...orderData };
            });
            return { store_id: doc.id, ...allOrdersDocData, orders: ordersData };
        }));

        setAllOrders(allOrdersData);


    };

    // useEffect
    useEffect(() => {
        getOrders();

    }, []);

    return (
        <div>

            <TableOuter thead_data={['Store Name', 'Orders Count', 'Detail']}>
                {
                    allOrders[0] && allOrders.map((order, index) => (
                        <OrderRow order={order} key={index} getOrders={getOrders} />
                    ))
                }
            </TableOuter>

        </div>
    )
}

export default AllOrders