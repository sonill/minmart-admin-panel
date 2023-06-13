import React from 'react'
import { toast } from 'react-hot-toast'

const Dialog = ({ children, openDialog, setOpenDialog }) => {
    return (
        <>
            {openDialog &&
                <div
                    onClick={(e) => {
                        if (e.target.id === "overlay") {
                            setOpenDialog(false)
                        }
                    }}
                    id="overlay"
                    className='absolute top-0 right-0 bottom-0 left-0 bg-gray-500 bg-opacity-50 transition-all ease-out duration-200'
                >
                </div>
            }

            <div
                className={`
                        w-[100%]
                        absolute 
                        top-0 
                        bottom-0 
                        h-full 
                        bg-white
                        transition-all 
                        ease-in-out
                        duration-300 
                        z-[90]
                        ${openDialog ? 'right-[0]' : 'right-[-100%]'}
                    `}
            >

                {children}
            </div>
        </>
    )
}

export default Dialog