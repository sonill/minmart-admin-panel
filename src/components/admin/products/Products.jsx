import { read, utils } from "xlsx";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { AuthContext } from "../../../context/AuthContextProvider"
import TableOuter from "../TableOuter";

const Products = () => {
    // context
    const { currentUser } = useContext(AuthContext);

    const nameRef = useRef(null);
    const [keyword, setKeyword] = useState("");
    const [excelData, setExcelData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [selectedVariation, setSelectedVariation] = useState({});
    const [selectedProductPrice, setSelectedProductPrice] = useState({});

    // handle file change
    async function handleFileChange(e) {
        e.preventDefault();
        nameRef.current.innerText = e.target.files[0].name;

        // xslx
        const f = await e.target.files[0].arrayBuffer();
        const wb = read(f);
        const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

        setExcelData(data);
    }

    // handle file remove
    function handleFileRemove() {
        setExcelData([]);
        nameRef.current.innerText = "";
        const input = document.getElementById("input_field");
        if (input) {
            input.value = "";
        }
    }

    // handle save
    async function handleSave() {
        const toastId = toast.loading("Uploading products...");

        try {
            let items = {};

            excelData.forEach((data) => {
                const variations = [];

                Object.keys(data).forEach((key) => {
                    if (key !== "name" && data[key] !== "null") {
                        variations.push({ label: key, price: data[key] });
                    }
                });

                items[data.name] = { name: data.name, variations: variations };
            });

            const querySnapshot = await getDocs(collection(db, "products"));

            querySnapshot.docs.forEach((doc) => {
                deleteDoc(doc.ref);
            });

            await addDoc(collection(db, "products"), items, "Products Document");
            fetchProducts();
            toast.success("Data saved successfully!", { id: toastId });
            handleFileRemove();
        } catch (error) {
            toast.error(error.message, { id: toastId });
        }
    }

    // handle variants change
    const handleVariationChange = (e, productName) => {
        const selectedOption = e.target.value;

        setSelectedVariation((prevState) => ({
            ...prevState,
            [productName]: selectedOption,
        }));

        const product = productsData.find((data) => data.name === productName);
        if (product) {
            const variation = product.variations.find((variation) => variation.label === selectedOption);
            if (variation) {
                setSelectedProductPrice((prevState) => ({ ...prevState, [productName]: variation.price }));
            }
        }
    };

    // fetch products
    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const data = querySnapshot.docs.map((doc) => doc.data());

            if (data.length) {
                const productsArray = Object.keys(data[0]).map((key) => {
                    const product = data[0][key];
                    return { name: product.name, variations: product.variations };
                });

                const products = productsArray.filter((prod) => prod.name.toLowerCase().includes(keyword.toLowerCase()))

                    // sorty array alphabetically according.
                    .sort((a, b) => a.name.localeCompare(b.name)); // Sort products alphabetically by product name

                setProductsData(products);
            }


        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [keyword]);

    // Initialize selectedVariation and selectedProductPrice with default values
    useEffect(() => {
        const defaultVariation = productsData.reduce((acc, product) => {
            acc[product.name] = product.variations[0]?.label || "";
            return acc;
        }, {});

        const defaultPrice = productsData.reduce((acc, product) => {
            const variation = product.variations.find((variation) => variation.label === defaultVariation[product.name]);
            acc[product.name] = variation?.price || null;
            return acc;
        }, {});

        setSelectedProductPrice(defaultPrice);
        setSelectedVariation(defaultVariation);
    }, [productsData]);

    return (
        <div className="flex flex-col">
            <div className="w-[100%] flex mb-[1.5rem]">
                <div className="mr-auto relative flex items-center text-[1.25rem] rounded-[0.5rem]">
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

                <div className={`${excelData.length == 0 ? "hidden" : "flex"} mr-[1rem] custom-shadow flex justify-between gap-[1rem] items-center text-[1.25rem] duration-150 text-[#b2eb5] rounded-[0.5rem]`} >
                    <p ref={nameRef} className="pl-[1rem]"></p>
                    <i onClick={handleFileRemove} className="fa-solid fa-xmark h-full text-[1rem] border cursor-pointer grid place-items-center px-[1.25rem] bg-gray-200 hover:bg-slate-300 duration-200" ></i>
                </div>

                {excelData.length !== 0 && (
                    <button onClick={handleSave} className="text-white bg-blue-500 hover:bg-blue-600 mr-[1rem] custom-shadow flex items-center text-[1.25rem] duration-150 text-[#b2eb5] px-[2rem] py-[1rem] rounded-[0.5rem]" >
                        Save
                    </button>
                )}

                {excelData.length === 0 && currentUser.role === "admin" && (
                    <label htmlFor="input_field" className="cursor-pointer h-[4rem] flex items-center text-[1.25rem] bg-blue-500 hover:bg-blue-800 duration-150 text-[#fff] px-[2rem] py-[1rem] rounded-[0.5rem] shadow-lg" >
                        <i className="fa-solid fa-upload text-white"></i>
                        <p className="ml-[1rem]">Upload Products in Excel Format</p>
                    </label>
                )}

                <input id="input_field" type="file" accept=".xlsx" onChange={handleFileChange} className="hidden" />
            </div>


            <TableOuter thead_data={['Product Name', 'Price']} >
                {productsData.map((product) => (
                    <tr key={product.name} className="border capitalize ">
                        <td className="px-[1.3rem] py-[0.7rem]  ">{product.name}</td>
                        <td className="px-[1.3rem] py-[0.7rem] ">
                            <table className="" >
                                <tbody>
                                    <tr className="bg-gray-100">
                                        {product.variations
                                            .sort((a, b) => a.label.localeCompare(b.label)) // Sort the variations alphabetically
                                            .map((variation) => (
                                                <td key={variation.label} className="px-[1rem] py-[0.5rem] border">
                                                    {variation.label}
                                                </td>
                                            ))}
                                    </tr>

                                    <tr >
                                        {product.variations.map((variation) => (
                                            <td key={variation.price} className="px-[1rem] py-[0.5rem] border">Rs. {variation.price}</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </td>

                    </tr>
                ))}
            </TableOuter>

        </div>
    );
};


export default Products;