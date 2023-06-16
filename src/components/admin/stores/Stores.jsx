import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase";

const Stores = () => {
    const [keyword, setKeyword] = useState('');
    const [stores, setStores] = useState([]);

    const getStores = async () => {
        const querySnapshot = await getDocs(collection(db, "stores"));
        const storesData = querySnapshot.docs.map((doc) => doc.data()).filter((store) => store.name.toLowerCase().includes(keyword.toLowerCase()));
        setStores(storesData);
    };

    useEffect(() => {
        getStores();
    }, [keyword]);

    return (
        <div className='flex flex-col'>
            <div className="mr-auto relative flex items-center mb-[1.5rem] text-[1.25rem] rounded-[0.5rem]">
                <input
                    placeholder="Quick search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="h-[4rem] border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem] pr-[5rem]"
                />

                {!keyword && (
                    <i className="fa-solid fa-magnifying-glass absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>
                )}

                {keyword && (
                    <i onClick={() => setKeyword("")} className="fa-solid fa-xmark absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]" ></i>
                )}
            </div>

            <div className="overflow-auto custom-shadow rounded-[0.5rem]">
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
        </div>
    );
};

export default Stores;
