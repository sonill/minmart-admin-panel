import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import TableOuter from "../TableOuter";

const Stores = () => {
    const [keyword, setKeyword] = useState('');
    const [stores, setStores] = useState([]);


    useEffect(() => {

        const getStores = async () => {
            // get data from firebase.
            const querySnapshot = await getDocs(collection(db, "stores"));

            const storesData = querySnapshot.docs
                .map((doc) => doc.data())

                // quick search.
                .filter(
                    (store) =>
                        store &&
                        store.company_name &&
                        store.company_name
                            .toLowerCase()
                            .includes(keyword.toLowerCase())
                )

                // sorty array alphabetically according to company name.
                .sort((a, b) =>
                    a.company_name.localeCompare(b.company_name, "en", { sensitivity: "base" })
                );
            setStores(storesData);
        };

        getStores();
    }, [keyword]);

    return (
        <div className='flex flex-col'>
            <div className="mr-auto relative flex items-center mb-[1rem] text-[1.25rem] ">
                <input
                    placeholder="Quick search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="h-[4rem] border border-gray-300 p-[0.75rem]  text-[1.5rem] pr-[5rem]"
                />

                {!keyword && (
                    <i className="fa-solid fa-magnifying-glass absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>
                )}

                {keyword && (
                    <i onClick={() => setKeyword("")} className="fa-solid fa-xmark absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]" ></i>
                )}
            </div>

            <TableOuter thead_data={['Name', 'Contact Person', 'Email', 'Phone Number', 'Address', 'PAN Number']}>
                {stores.map((store, i) => (
                    <tr key={i} className="border last:border-0 ">
                        <td className="p-[1.3rem]  ">{store.company_name ? store.company_name : "-"}</td>
                        <td className="p-[1.3rem] "> {store.contact_person ? store.contact_person : "-"} </td>
                        <td className="p-[1.3rem] ">{store.email ? store.email : "-"}</td>
                        <td className="p-[1.3rem] ">{store.mobile_number ? store.mobile_number : "-"}</td>
                        <td className="p-[1.3rem] ">{store.company_address ? store.company_address : "-"}</td>
                        <td className="p-[1.3rem]  ">{store.company_pan ? store.company_pan : "-"}</td>
                    </tr>
                ))}

            </TableOuter>


        </div>
    );
};

export default Stores;
