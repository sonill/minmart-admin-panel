import { useState } from 'react'
import { toast } from 'react-hot-toast';
import ProductForm from '../util/ProductForm';

const Users = () => {
    const [keyword, setKeyword] = useState("");
    const [showProductForm, setShowProductForm] = useState(false);


    return (
        <div className='flex flex-col'>
            <div className='w-[100%] flex pb-[1.5rem]'>
                <div className='mr-auto relative flex items-center text-[1.25rem] rounded-[0.5rem]'>
                    <input placeholder="Quick search" className='h-[4rem] border border-gray-300 p-[0.75rem] rounded-[0.5rem] text-[1.5rem] pr-[5rem]' value={keyword} onChange={e => setKeyword(e.target.value)} />
                    <i className="fa-solid fa-magnifying-glass absolute cursor-pointer text-[#7d817e] text-[1.5rem] bottom-[0.5rem] right-[1rem] transform translate-y-[-50%]"></i>
                </div>

                <button onClick={() => setShowProductForm(!showProductForm)} className='h-[4rem] flex items-center text-[1.25rem] bg-blue-500 hover:bg-blue-600 duration-150 text-[#fff] px-[2rem] py-[1rem] rounded-[0.5rem] shadow-lg'>
                    <i className="fa-solid fa-plus text-white"></i>
                    {/* <i className="fa-solid fa-upload text-white"></i> */}
                    <p className='ml-[1rem] text-white'>Add Product</p>
                </button>
            </div>

            <table className="table-auto w-[100%] rounded-[0.5rem] overflow-hidden custom-shadow">
                <thead>
                    <tr className="bg-[#ededed]">
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">User ID</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Status</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Total</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Date</th>
                        <th className="p-[1.5rem] text-justify text-[1.45rem]">Actions</th>
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
                                    <td className='p-[1.5rem] text-[1.35rem]'>
                                        <i className="fa-solid fa-pencil mr-[1rem] cursor-pointer"></i>
                                        <i className="fa-solid fa-trash cursor-pointer"></i>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody >
            </table>

            {/******************** Product Form ********************/}

            {showProductForm &&
                <div
                    onClick={(e) => {
                        if (e.target.id === "overlay") {
                            setShowProductForm(false)
                        }
                    }}
                    id="overlay"
                    className='absolute top-0 right-0 bottom-0 left-0 bg-gray-500 bg-opacity-50 transition-all ease-out duration-200'
                >
                </div>
            }
            

            <ProductForm showProductForm={showProductForm} setShowProductForm={setShowProductForm} />

            
        </div>
    )
}

export default Users