import moment from 'moment/moment'
import { db } from "../../../firebase"
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore"

// import component
import TableOuter from '../TableOuter';
import React from 'react';
import { toast } from "react-hot-toast";

const OrderDetailDrawer = ({ orderDetailDrawer, setOrderDetailDrawer, orders, store_id, store_name, getOrders }) => {

    let totalPrice = 0;


    const deleteSubcollection = async (collectionRef) => {
        const querySnapshot = await getDocs(collectionRef);

        // Delete documents in the subcollection
        const deletePromises = querySnapshot.docs.map(async (doc) => {
            const subcollectionRef = collection(doc.ref, 'subcollection'); // Replace 'subcollection' with your actual subcollection name
            await deleteSubcollection(subcollectionRef); // Recursively delete subcollections
            await deleteDoc(doc.ref); // Delete the document
        });
        await Promise.all(deletePromises);
    };

    const markOrderAsDispatched = async () => {
        try {
            const documentRef = doc(db, 'all_orders', store_id);
            await deleteSubcollection(collection(documentRef, 'orders'));
            await deleteDoc(documentRef); // Delete the parent document
            toast.success("Current order is removed from the database.");
            setOrderDetailDrawer(false);
            getOrders();
        } catch (error) {
            toast.error('Error deleting document:', error);
        }
    };


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
                <div className='flex  items-center mb-[1rem]'>
                    <h1 className='text-[1.8rem] flex-1 '>Orders of <span className="font-bold text-[1.8rem] text-green-600">{store_name}</span></h1>

                    <button onClick={() => markOrderAsDispatched()} className="h-[3.5rem] mr-4 text-[1.25rem] bg-green-600 text-white px-[1.2rem]  rounded-[0.5rem]">
                        <i className="fa-solid fa-check mr-[1rem]"></i>
                        Mark as Dispatched
                    </button>

                    <button onClick={() => setOrderDetailDrawer(false)} className="h-[3.5rem] px-[1.2rem] text-[1.25rem] bg-gray-600 text-white  rounded-[0.5rem]">
                        <i className="fa-solid fa-xmark mr-[1rem]"></i>
                        Close
                    </button>

                </div>

                <TableOuter thead_data={['Item', '', 'Qty', 'Price']} >

                    {orders[0] && orders.map((odr, index) => (
                        <React.Fragment key={index}>
                            <tr key={index} className="">
                                <td colSpan={4} className="py-[1rem] px-[1.5rem]  text-[1.35rem] font-bold">
                                    {moment(odr.date).format('MMMM DD, YYYY h:mm A')}</td>
                            </tr>

                            {odr.orderItems[0] && odr.orderItems.map((item, index) => {
                                totalPrice += item.price; // Update the total price

                                return (
                                    <tr key={index} className="border border-collapse">
                                        <td className="py-[1rem] px-[1.5rem] text-[1.35rem] w-[50px] ">{index + 1}</td>
                                        <td className="py-[1rem] px-[1.5rem] text-[1.35rem] ">{item.itemName}</td>
                                        <td className="py-[1rem] px-[1.5rem] text-[1.35rem]">{item.quantity + ' ' + item.unitType}</td>
                                        <td className="py-[1rem] px-[1.5rem] text-[1.35rem]">Rs. {item.price}</td>
                                    </tr>
                                );
                            })}

                        </React.Fragment>
                    ))}
                    <tr>
                        <td colSpan={3} className="py-[1rem] px-[1.5rem]  text-[1.35rem] font-bold">Total</td>
                        <td className="py-[1rem] px-[1.5rem]  text-[1.35rem] font-bold">Rs. {totalPrice.toFixed(2)}</td>
                    </tr>

                </TableOuter>

            </div >
        </>
    )
}

export default OrderDetailDrawer