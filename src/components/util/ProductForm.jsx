import React from 'react'
import { toast } from 'react-hot-toast'

const ProductForm = ({showProductForm, setShowProductForm}) => {
    return (
        <form
            onClick={() => toast("sadfasdf")}
            className={`
                    w-[37.5rem]
                    absolute 
                    top-0 
                    bottom-0 
                    h-full 
                    bg-red-500
                    transition-all 
                    ease-in-out
                    duration-300 
                    z-[90]
                    ${showProductForm ? 'right-[0rem]' : 'right-[-37.5rem]'}
                `}
        >
        </form>
    )
}

export default ProductForm