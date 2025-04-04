import { useNavigate } from "react-router-dom";
import AccountIcon from "../icons/AccountIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { DefaultIcons, Types } from "./DashBoard";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteIcon from "@/icons/DeleteIcon";
import { motion } from "framer-motion";
import ShinnyEffect from "@/components/ShinnyEffect";
import { useEffect, useState } from "react";
import { backend_url } from "@/utils/bakendUrl";
import axios from "axios";



const Account = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState<Types[]>([]);

  const logoutUser = () => {

    localStorage.removeItem("token");

    toast("User Logged out !!!");

    setTimeout(() => {
      navigate("/auth")
    }, 1000)
  }


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast("Expired token, Please login");
      setTimeout(() => {
        navigate("/auth");
      }, 1000);
      return;
    }

    const fetchTypes = async () => {
      try {
        setLoading(true);


        const response = await axios.get(
          `${backend_url}/types`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            }
          }
        );

        const { totalTypes, success, message } = response.data;
        if (success) {
          setTypes(totalTypes);
        } else {
          toast(message || "Internal server error")
        }


      } catch (error) {
        toast("Internal server error while fetching content")
      } finally {
        setLoading(false);
      }
    }

    fetchTypes();
  })


  return (
    <div className="relative overflow-hidden flex md:flex-row flex-wrap flex-col w-full md:px-24 md:py-12 px-4 py-6 gap-12 bg-[#171717] text-white min-h-[600px]">

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
      <div className="flex h-fit flex-col bg-[#0A0A0A] md:w-1/3 px-10 py-6 rounded-md gap-4 min-h-[600px]">

        <div className="">
          <h1 className="text-3xl font-bold"> <span className="text-[#594ef1]">Brain </span>Information</h1>
        </div>

        <div className="flex items-center gap-4 w-1/3">
          <div className="bg-gray-200 p-6 rounded-full text-[#594ef1]">

            <AccountIcon size="lg" />

          </div>

          <div className="flex items-center gap-4" title="logout">
            <span className="text-xl opacity-90 " >
              devlprnitish
            </span>

            <span onClick={logoutUser} className="rotate-90 cursor-pointer hover:text-[#594ef1]">
              <LogoutIcon />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4  w-full ">


          {types.map((type, index) => (
            <div
              key={index}
              className="w-full flex items-center gap-2 py-2  rounded-lg "
            >
              <div className="text-xl">{DefaultIcons[type.typename] || <Globe2 />}</div>
              <div className="text-lg font-medium opacity-90">{type.typename}</div>
              <div className="text-[#594ef1]">
                {": "}{10}
              </div>
            </div>
          ))}

        </div>
      </div>

      <div className="flex flex-col h-fit gap-6 text-white bg-[#0A0A0A] rounded-md md:px-10 md:py-16 md:w-1/3 px-4 py-6 min-h-[600px]">
        <div className="">
          <h1 className="text-3xl font-bold"> <span className="text-[#594ef1]">Sharing </span>Links</h1>
        </div>

        <div className="">

          <div className="flex flex-row items-center gap-2  py-2">
            <div className="bg-[#594ef13f] p-2 rounded-md text-white cursor-pointer hover:text-red-500">
              <DeleteIcon />
            </div>
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value="https://ui.shadcn.com/docs/installationhttps://ui.shadcn.com/docs/installationhttps://ui.shadcn.com/docs/installation"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />

            <Button type="submit" size="sm" className="px-3 cursor-pointer hover:text-[#594ef1]">
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Account;