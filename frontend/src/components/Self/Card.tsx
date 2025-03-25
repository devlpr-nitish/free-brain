import { CiLink } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { IoDocumentsOutline } from "react-icons/io5";
import { LiaFileVideoSolid } from "react-icons/lia";
import { FaCode } from "react-icons/fa";
import ShareICon from "@/icons/ShareICon";
import DeleteIcon from "@/icons/DeleteIcon";
import CalenderIcon from "@/icons/CalenderIcon";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Copy, GlobeIcon, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { MyButton } from "./MyButton";
import ShinnyEffect from "../ShinnyEffect";
import axios from "axios";
import { backend_url } from "@/utils/bakendUrl";
import { toast } from "sonner";
import { Content } from "@/pages/DashBoard";


interface CardProps {
  id: string
  title: string;
  type: string;
  content: string;
  tags: string[];
  links: string[];
  createdAt: string;
  contents: any[];
  setContents: (contents: any[]) => void;
}

const typeIcons: any = {
  twitter: <FaXTwitter />,
  video: <LiaFileVideoSolid />,
  document: <IoDocumentsOutline />,
  code: <FaCode />,
  link: <CiLink />,
  default: <GlobeIcon />
};

export const formatDate = (timestamp: string | Date) => {
  const date = new Date(timestamp);

  // Extract day, month, and year
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();


  return `${day}/${month}/${year}`;
};

const Card: React.FC<CardProps> = ({ id, title, type, content, tags, createdAt, setContents }: CardProps) => {

  const navigate = useNavigate();


  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };


  const showDetailContent = () => {
    navigate(`/content/${id}`);
  }


  // delete content
  const deleteContent = async (id: string) => {

    try {


      const token = localStorage.getItem("token");
      if (!token) {
        toast("Expired token, Please login");
        setTimeout(() => {
          navigate("/auth");
        }, 1000);
        return;
      }

      // delete content from frontend before server
      // setContents((prevContents: Content[]) => prevContents.filter((content) => content._id !== id));


      const response = await axios.delete(`${backend_url}/contents/${id}`,
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          }
        }
      )

      const { success, message } = response.data;
      toast(message);

    } catch (error) {
      console.error("Error deleting content:", error);

      // Revert the frontend state if the deletion fails
      // setContents((prevContents) => [...prevContents, /* re-add the deleted content */]);

      toast("Failed to delete content. Please try again.");
    } finally {

    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9
      }}

      whileInView={{
        opacity: 1,
        scale: 1
      }}

      viewport={{
        once: false,
        amount: 0.6
      }}

      transition={{
        duration: 0.6,
        ease: "easeIn"
      }}

      onClick={showDetailContent}

      className="z-5 bg-[#0A0A0A] text-white w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative overflow-hidden flex flex-col gap-4  rounded-md p-4 border border-gray-500  shadow-md transition hover:bg-[#1b1b1b] hover:border-[#594ef1] cursor-pointer">
      <div className=" flex flex-wrap items-center justify-between border-b border-gray-500 pb-2">
        <div className="flex items-center font-bold gap-2 text-xl ">
          <div className="opacity-60 ">{typeIcons[type] || typeIcons.default}</div>
          <div className="title">{truncateText(title, 20)}</div>
        </div>

        <div className="flex items-center gap-4 opacity-60">


          <Dialog >
            <DialogTrigger asChild>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  // shareContent()
                }}
                className="z-10 cursor-pointer hover:text-[#594ef1]">
                <ShareICon size="lg" />
              </div>

            </DialogTrigger>


            <DialogContent className="flex bg-black border border-gray-500 text-white flex-col items-center justify-center absolute md:left-173 md:top-100 left-4 top-100 sm:max-w-md">
              <DialogHeader>
                <DialogTitle>You are sharing this content from your brain</DialogTitle>
                <DialogDescription>
                  Anyone who get this link will only be able to see this content in brain data.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue="https://ui.shadcn.com/docs/installation"
                    readOnly
                  />
                </div>
                <Button type="submit" size="sm" className="px-3 cursor-pointer">
                  <Copy />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" className="bg-[#594EF1] hover:bg-[#594ef1e0] cursor-pointer">
                    Don't share
                  </Button>
                </DialogClose>
              </DialogFooter>

            </DialogContent>
          </Dialog>



          <Dialog>
            <DialogTrigger asChild>
              <div
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="z-10 cursor-pointer hover:text-red-600">
                <DeleteIcon size="lg" />
              </div>
            </DialogTrigger>
            <DialogContent className="flex bg-black border border-gray-500 text-white flex-col items-center justify-center absolute md:left-173 md:top-100 left-4 top-100 sm:max-w-md ">
              <DialogHeader>
                <DialogTitle>Are you sure you want to delete?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your content.
                </DialogDescription>
                <div className="flex gap-10 mt-4 justify-center">
                  <MyButton
                    text="Cancle"
                    variant="secondary"
                    startIcon={<X />}
                    size="md"
                  />
                  <MyButton
                    text="Delete"
                    variant="primary-delete"
                    size="md"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteContent(id)}
                  />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="w-full text-xl min-h-40">{truncateText(content, 80)}</div>

      <div className="tags min-h-[50px] flex gap-2 overflow-hidden text-ellipsis whitespace-nowrap ">
        {tags.map((tag) => (
          <div className="text-[#594ef1] h-1/2 px-2 bg-white rounded-md text-md">{`# ${tag}`}</div>
        ))}

      </div>

      <div className="flex items-center justify-end gap-2 text-sm font-normal opacity-60">
        <div className="text-[#877eff]">
          <CalenderIcon />
        </div>
        <div className="">
          {formatDate(createdAt)}
        </div>
      </div>

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
        <ShinnyEffect left={50} top={50} size={250} />
      </motion.div>
    </motion.div>
  );
};

export default Card;
