import { ReactElement } from "react";
import {motion} from "framer-motion";

interface ButtonProps {
    variant: "primary" | "secondary" | "primary-delete" | "primary-home";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
}


const variantStyles = {
    "primary": "bg-[#594ef1] text-white shadow-sm hover:bg-[#594ef1e0] transition",
    "primary-delete": "bg-red-600 text-white shadow-sm hover:bg-red-500 transition",
    "primary-home": "bg-[#594ef1] text-white shadow-sm hover:bg-[#594ef1e0] transition",
    "secondary": "border border-[#594ef1] text-[#594ef1] shadow-sm hover:bg-[#594ef1] hover:text-white transition",
}

const defaultStyles = "rounded-md flex items-center font-light cursor-pointer";

const sizeStyles = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

export const MyButton = (props: ButtonProps) => {

    return <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={props.onClick} className={`flex items-center ${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`} >
        {props.startIcon}
        <div className="pr-2 pl-2">
            {props.text}
        </div>
        {props.endIcon}
    </motion.button>
}

