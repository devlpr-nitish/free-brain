import axios from "axios";
import { useState } from "react";
import { LuBrain } from "react-icons/lu";
import { backend_url } from "../utils/bakendUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";
import EyeIcons from "@/icons/EyeIcons";
import EyeCloseIcon from "@/icons/EyeCloseIcon";
import ShinnyEffect from "@/components/ShinnyEffect";



// const backend_url = import.meta.env.BACKEND_URL;


const Signin = () => {

    const navigate = useNavigate();



    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginOrSignup, setloginOrSignup] = useState("");
    const [visible, setVisible] = useState(true);


    const token = localStorage.getItem("token");
    if (token) {
        toast("You are already loggedIn");
        setTimeout(() => {
            navigate("/user");
        }, 1000);
        return;
    }



    const handleSignin = async () => {

        try {

            setLoading(true);

            // handling empty field auth
            if (username.length == 0 || password.length == 0) {
                toast("username and pasword is required");
                return;
            }


            const response = await axios.post(`${backend_url}/user/signin`, {
                username, password
            })

            const token = response.data.token;

            localStorage.setItem("token", token);
            localStorage.setItem("username", username);

            toast(response.data.message);
            setIsLoggedIn(true);

            if (!response.data.success) {
                return;
            }

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500)
        } catch (error) {
            console.log(error);

            toast("Error, while signin");
        } finally {
            setLoading(false);

        }
    }


    const handleSignup = async () => {
        try {
            setLoading(true);

            // handling empty field auth
            if (username.length == 0 || password.length == 0) {
                toast("username and pasword is required")
                return;
            }

            const response = await axios.post(`${backend_url}/user/signup`, {
                username, password
            })


            toast(response.data.message);

            if (response.data.success) {
                toast("Please, Login !!!");
            }
        } catch (error) {

            console.log(error);
            toast("Error while, signup");

        } finally {
            setLoading(false);

        }
    }



    return (
        <div className=" w-full flex flex-col md:flex-row  items-center justify-center md:px-24 md:py-20 px-2 py-4 rounded-md relative overflow-hidden">

            {/* ShinnyEffect with Improved Positioning */}
            <motion.div
                className="absolute top-[-50px] left-[-50px] hidden md:block"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <ShinnyEffect left={10} top={10} size={300} />
            </motion.div>
            <motion.div
                className="absolute top-[-50px] right-[-50px] md:block"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <ShinnyEffect right={10} top={10} size={300} />
            </motion.div>
            <motion.div
                className="absolute top-[-50px] left-[-50px] md:block"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <ShinnyEffect left={50} top={400} size={300} />
            </motion.div>
            <motion.div
                className="absolute top-[-50px] left-[-50px]  md:block"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <ShinnyEffect right={100} top={100} size={300} />
            </motion.div>

            
            <div className="md:w-1/2 w-full flex flex-col items-center justify-center gap-10 md:p-28 p-4  ">
                <div className="flex flex-col justify-center gap-4 items-center">

                    <div className="text-9xl opacity-90 text-[#594ef1]">
                        <LuBrain />
                    </div>

                    <div className="text-5xl text-white">
                        <span className="font-bold opacity-90 font-mono">Free Brain</span>
                    </div>

                </div>

                <div className="text-md flex flex-col items-center font-mono text-white">
                    <p>Want to free your brain,</p>
                    <p>Just try it once.</p>
                </div>
            </div>
            <div className="md:w-1/2 w-full md:px-24 md:py-12 px-2 py-4 flex flex-col gap-4 ">

                <div className="w-full text-white backdrop-blur-lg shadow-lg border border-[#594ef1] flex flex-col items-center px-18 py-14  md:px-16 md:py-18 rounded-md ">

                    <div className="w-full flex items-center justify-center mb-4 gap-2 ">
                        <select
                            onChange={(e) => setloginOrSignup(e.target.value)}
                            className="border border-[#594ef1] py-1 px-2 rounded-md cursor-pointer outline-0" name="" id="">
                            <option className="text-black border border-white rounded-md" value="signin">Signup</option>
                            <option className="text-black border border-white rounded-md" value="login">Login</option>
                        </select>
                        <h1 className="text-xl text-wrap text-center font-bold text-white">to <span className="text-[#594ef1]" >Free Brain</span></h1>
                    </div>

                    <div className="w-full flex flex-col gap-6 md:py-4 py-4">

                        <div className="flex flex-col gap-2 ">
                            <label htmlFor="username" className="">username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                name="username" type="text" className="border border-[#594ef1] outline-0 px-4 py-2 rounded-md" />
                        </div>

                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="password">password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password" type={visible ? "password" : "text"} className="border border-[#594ef1] outline-0 px-4 py-2 rounded-md" />

                            <span
                                onClick={() => setVisible((prev) => !prev)}
                                className="absolute bottom-3 right-3 cursor-pointer z-10 ">
                                {visible ? <EyeCloseIcon /> : <EyeIcons />}
                            </span>
                        </div>


                        {loginOrSignup == "login" ?
                            <div className="flex mt-4 items-center">
                                <button
                                    disabled={loading}
                                    onClick={handleSignin}
                                    className="text-white text-center text-md bg-[#594ef1] w-full px-4 py-2 rounded-md cursor-pointer transition hover:bg-[#594ef1e8]">login</button>
                            </div>

                            :
                            <div className="flex mt-4 flex-col items-center">
                                {/* <p className="opacity-80 mb-1 text-[#594ef1e8]">Don't have an account ?</p> */}
                                <button disabled={loading} onClick={handleSignup} className="text-center text-[#594ef1] text-md border border-[#594ef1] w-full px-4 py-2 rounded-md cursor-pointer transition hover:bg-[#594ef1]">signup</button>
                            </div>
                        }




                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signin;