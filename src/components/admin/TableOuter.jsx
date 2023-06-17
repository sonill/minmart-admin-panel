const TableOuter = ({ thead_data, children }) => {
    return (
        <div className="overflow-auto ">
            <table className="w-[100%] border-spacing-0 text-[1.5rem] min-w-full">
                <thead>
                    <tr className="bg-[#ededed] border text-justify">
                        {thead_data &&
                            thead_data.map((element, i) => (
                                <th key={element + '_' + i} className="px-[1.3rem] py-[1.5rem]">
                                    {element}
                                </th>
                            ))}
                    </tr>
                </thead>

                <tbody>
                    {children && children}

                    {(!children || !children.length) && (
                        <tr className="border-b last:border-0  text-center">
                            <td className="p-[1rem]" colSpan={thead_data.length}>No data found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TableOuter;
