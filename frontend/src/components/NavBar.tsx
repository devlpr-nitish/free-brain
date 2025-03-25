import { Link, useNavigate } from "react-router-dom"
import AccountIcon from "../icons/AccountIcon";
import { LuBrain } from "react-icons/lu";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import MenuIcon from "@/icons/MenuIcon";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"


const NavBar = () => {

    const token = localStorage.getItem("token");
    
    const username = localStorage.getItem("username");

    const navItems = [
        { item: "Home", link: "/" },
        { item: "Dashboard", link: "/dashboard" },
    ];

    const navigate = useNavigate();

    const navigateOnClick = (link: string) => {
        navigate(link);
    };

    return (
        <div className="w-full bg-[#171717] flex justify-between items-center py-2 mx-auto rounded-lg border-[1px] border-[#404040] h-20 md:px-4 md:flex-row flex-row gap-4 mb-6">
            <div className="flex justify-between items-center gap-4 w-full md:w-auto">
                <motion.div
                    initial={{}}
                    whileHover={{ color: "#594ef5", scale: 1.12 }}
                    transition={{ duration: 1.5 }}
                    onClick={() => navigateOnClick("/")}
                    className="text-lg px-6 cursor-pointer z-10"
                    aria-label="Navigate to Home"
                >
                    <LuBrain className="text-3xl text-[#594ef1]" />
                </motion.div>

                {navItems.map((value, index) => (
                    <motion.div
                        key={index}  // Added unique key
                        initial={{}}
                        whileHover={{ color:"#594EF1", scale: 1.12 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        onClick={() => navigateOnClick(value.link)}
                        className="text-[#8C8C8C] text-lg px-6 cursor-pointer hidden md:block relative"
                    >
                        {value.item}
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center w-full md:w-auto justify-end md:justify-start">
                <div
                    className="text-[#8C8C8C] px-4 text-lg flex items-center"
                >
                    {!token ? (
                        <Button onClick={() => navigateOnClick("/auth")} className="cursor-pointer rounded-sm bg-transparent border text-[#594EF1] border-[#594EF1] hover:bg-[#594ef1e0] hover:text-white" asChild>
                            <Link to="/auth">Login</Link>
                        </Button>
                    ) : (
                        <>

                        {/* // i want to show this on big screen */}
                        <div className="hidden md:block text-[#594EF1] hover:text-[#594ef1e0]">
                            <Link to="/user">
                                <AccountIcon size="lg"/>
                            </Link>
                        </div>
                                                
                            <Drawer>
                                <DrawerTrigger>
                                    <motion.span
                                    initial={{
                                        rotate:0
                                    }}

                                    whileTap={{
                                        rotate:180
                                    }}

                                    className="cursor-pointer block md:hidden hover:text-[#594EF1]">
                                        <MenuIcon size="lg" />
                                    </motion.span>
                                </DrawerTrigger>

                                <DrawerContent className="bg-[#0A0A0A] block md:hidden">
                                    <div className="bg-[#0A0A0A] flex flex-col justify-center items-center gap-4 w-full px-2 py-10">
                                        <div
                                        onClick={() => navigateOnClick("/")}
                                        className="px-4 py-4 rounded-md border border-[#404040] w-full text-center cursor-pointer text-white hover:border-[#594EF1] transition hover:text-[#594EF1]">
                                            Home
                                        </div>
                                        <div
                                        onClick={() => navigateOnClick("/dashboard")}
                                        className="px-4 py-4 rounded-md border border-[#404040] w-full text-center cursor-pointer text-white hover:border-[#594EF1] transition hover:text-[#594EF1]">
                                            Dashboard
                                        </div>
                                        <div
                                        onClick={() => navigateOnClick("/user")}
                                        className="px-4 py-4 rounded-md border border-[#404040] w-full text-center cursor-pointer text-white hover:border-[#594EF1] transition hover:text-[#594EF1]">
                                            Profile
                                        </div>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        
                        </>
                    )}
                </div>
            </div>
            


        </div>
    );
};

export default NavBar;
