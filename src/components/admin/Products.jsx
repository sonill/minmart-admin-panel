import { read, utils } from 'xlsx';
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Products = () => {
    const [keyword, setKeyword] = useState("");
    const [file, setFile] = useState('');
    const nameRef = useRef(null);
    const [tableData, setTableData] = useState([]);


    async function handleFileChange(e) {
        e.preventDefault();
        setFile(e.target.files[0]);
        nameRef.current.innerText = e.target.files[0].name;

        // xslx 
        const f = await e.target.files[0].arrayBuffer();
        const wb = read(f);
        const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        setTableData(data);
    }

    function handleFileRemove() {
        setFile('');
        nameRef.current.innerText = '';
        const input = document.getElementById('input_field');
        if (input) { input.value = ''; }
    }

    const collectionRef = collection(db, "dummycollection");

    async function handleSave() {
        const toastId = toast.loading("Uploading products...");
    
        try {
            const querySnapshot = await getDocs(collectionRef);
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });

            for (const item of tableData) {
                await addDoc(collectionRef, item);
            }

            toast.success("Data saved successfully!", {id: toastId});

            handleFileRemove();
        } catch (error) {
            toast.error(error.message, {id: toastId});
        }
    }




    return (
        <div className='flex flex-col'>
            <div className='w-[100%] flex pb-[1.5rem]'>
                <div className='mr-auto relative flex items-center text-[1.25rem] rounded-[0.5rem]'>
                    <input placeholder="Quick search" className='h-[4rem] border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem] pr-[5rem]' value={keyword} onChange={e => setKeyword(e.target.value)} />
                    <i className="fa-solid fa-magnifying-glass absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>
                </div>

                <div className={`${file == '' ? 'hidden' : 'flex'} mr-[1rem] custom-shadow flex gap-[1rem] items-center text-[1.25rem] duration-150 text-[#b2eb5] px-[2rem] py-[1rem] rounded-[0.5rem]`}>
                    <i onClick={handleFileRemove} className="fa-solid fa-xmark text-[1.5rem] cursor-pointer"></i>
                    <p ref={nameRef}></p>
                </div>

                {file !== '' && <button onClick={handleFileRemove} className=' bg-[#27374D] text-white mr-[1rem] custom-shadow flex items-center text-[1.25rem] duration-150 text-[#b2eb5] px-[2rem] py-[1rem] rounded-[0.5rem]'>Cancel</button>}

                {file !== '' && <button onClick={handleSave} className='text-white bg-blue-500 hover:bg-blue-600 mr-[1rem] custom-shadow flex items-center text-[1.25rem] duration-150 text-[#b2eb5] px-[2rem] py-[1rem] rounded-[0.5rem]'>Save</button>}

                {file === '' && <label htmlFor='input_field' className='cursor-pointer h-[4rem] flex items-center text-[1.25rem] bg-blue-500 hover:bg-blue-600 duration-150 text-[#fff] px-[2rem] py-[1rem] rounded-[0.5rem] shadow-lg'>
                    <i className="fa-solid fa-upload text-white"></i>
                    <p className='ml-[1rem] text-white'>Add Product</p>
                    <input type="file" accept=".xlsx, .xls, application/vnd.ms-excel" className='hidden' id='input_field' onChange={handleFileChange} />
                </label>}

            </div>

            <table className="table-auto w-[100%] rounded-[0.5rem] overflow-hidden custom-shadow">
                <thead>
                    <tr className="bg-[#ededed]">
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">User ID</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Status</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Total</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Date</th>
                        {/* <th className="p-[1.5rem] text-justify text-[1.45rem]">Actions</th> */}
                    </tr>
                </thead>

                <tbody>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((_, index) => {
                            return (
                                <tr key={index} className="border-b hover:bg-gray-100 duration-150">
                                    <td className='p-[1.5rem] text-[1.35rem]'>asdfasdf</td>
                                    <td className="p-[1.5rem] text-[1.35rem]">asdfasdf</td>
                                    <td className='p-[1.5rem] text-[1.35rem]'>asdfasdf</td>
                                    <td className='p-[1.5rem] text-[1.35rem]'>asdfasdf</td>
                                    {/* <td className='p-[1.5rem] text-[1.35rem]'>
                                        <i className="fa-solid fa-pencil mr-[1rem] cursor-pointer"></i>
                                        <i className="fa-solid fa-trash cursor-pointer"></i>
                                    </td> */}
                                </tr>
                            );
                        })
                    }
                </tbody >
            </table>
        </div>
    )
}

export default Products