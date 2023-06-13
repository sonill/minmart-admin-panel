import moment from 'moment'

const OrderDetail = ({ orders, openDialog, setOpenDialog }) => {

    return (
        <>
            <div className={` w-[100%] p-[2rem] absolute top-0 bottom-0 left-0 right-0 h-full bg-white transition-all ease-in-out z-[50] ${openDialog ? 'flex flex-col' : 'hidden'} `} >
                <div className="flex justify-between items-center mb-[1rem]">
                    <h2 className="text-[1.8rem]">Orders</h2>
                    <button onClick={() => setOpenDialog(false)} className="text-white bg-gray-500 hover:bg-gray-600 mr-[1rem] custom-shadow flex items-center text-[1.25rem] duration-150 text-[#b2eb5] px-[1.8rem] py-[0.8rem] rounded-[0.5rem]">Close</button>
                </div>

                <table className="w-[100%] border-spacing-0">
                    <thead>
                        <tr className="bg-[#ededed]">
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Date</th>
                            {/* <th className="p-[1.5rem] text-justify text-[1.45rem]">Status</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Total</th>
                            <th className="p-[1.5rem] text-justify text-[1.45rem]">Order Items</th> */}
                        </tr>
                    </thead>

                    <tbody>
                        {
                            orders.map((odr, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{moment(odr.date.seconds * 1000).format('YYYY-MM-DD')}</td>
                                        {/* <td className='p-[1.5rem] text-[1.35rem]'>{odr.status}</td>
                                        <td className='p-[1.5rem] text-[1.35rem]'>{odr.total}</td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default OrderDetail;