import React from 'react'
import { motion, HTMLMotionProps } from "motion/react";

interface CustomButtonProps extends HTMLMotionProps<'button'> {
    
}

const CustomButton = ({
    children,
    className,
    ...buttonProps
}: CustomButtonProps ) => {
    return (
        <motion.button
            {...buttonProps}
            className={`
                border-2
                rounded-[5px]
                px-4
                py-1.5
                ${className}
                text-sm
            `}
            initial={{
                color: '#ffffff',
                fontWeight: '600',
                backgroundColor: "#f77f01",
                borderColor: '#ffc06a',
            }}
            whileHover={{
                scale: 1.05,
                backgroundColor: "#FFBF69",
                color: "#000814",
                cursor: "pointer",
                borderColor: "#FF9F1C",
                fontWeight: '700',
            }}
            transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
            whileTap={{
                scale: 0.95
            }}
        >
            {children}
        </motion.button>
  )
}

export default CustomButton