import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Stores = () => {
    const [stores, setStores] = useState([]);

    const getStores = async () => {
        const querySnapshot = await getDocs(collection(db, "stores"));
        const storesData = querySnapshot.docs.map((doc) => doc.data());
        setStores(storesData);
    };

    useEffect(() => {
        getStores();
    }, []);

    return (
        <div className='w-full flex flex-col border rounded-[0.5rem] overflow-hidden'>
            <table className="w-[100%] border-spacing-0">
                <thead>
                    <tr className="bg-[#ededed]">
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Name</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]"> Contact Person </th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Email</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]"> Phone Number </th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Address</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]"> PAN Number </th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store, i) => (
                        <tr key={i} className="border-b last:border-0">
                            <td className="p-[1.5rem] text-[1.35rem] ">{store.name}</td>
                            <td className="p-[1.5rem] text-[1.35rem]"> {store.contact_person} </td>
                            <td className="p-[1.5rem] text-[1.35rem]">{store.email}</td>
                            <td className="p-[1.5rem] text-[1.35rem]">{store.mobile_no}</td>
                            <td className="p-[1.5rem] text-[1.35rem]">{store.address}</td>
                            <td className="p-[1.5rem] text-[1.35rem] ">{store.pan_no}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Stores;
