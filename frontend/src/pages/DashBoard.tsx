import { FaXTwitter } from "react-icons/fa6";
import { LiaFileVideoSolid } from "react-icons/lia";
import { IoDocumentsOutline } from "react-icons/io5";
import { TiThSmallOutline } from "react-icons/ti";
import { CiLink } from "react-icons/ci";
import { MyButton } from "../components/Self/MyButton";
import ShareICon from "../icons/ShareICon";
import PlusIcon from "../icons/PlusIcon";
import CodeIcon from "../icons/CodeIcon";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/Self/Card";

import { Copy, Globe2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";
import { backend_url } from "@/utils/bakendUrl";
import ExpandIcon from "@/icons/ExpandIcon";
import CollapseIcon from "@/icons/CollapseIcon";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import ShinnyEffect from "@/components/ShinnyEffect";
import axios from "axios";





export interface DefaultIconsType {
  [key: string]: ReactNode;
};

export const DefaultIcons:DefaultIconsType =
{
  "All": <TiThSmallOutline />,
  "Twittes": <FaXTwitter />,
  "Youtube": <LiaFileVideoSolid />,
  "Document": <IoDocumentsOutline />,
  "Code": <CodeIcon />,
}

export interface Content {
  title: string;
  content: string;
  link: string[];
  type: string;
  typename: string;
  tags: string[];
  userId: string;
  _id: string;
  createdAt: string;
}

export  interface Types{
  _id: string;
  typename: string;
  __v: number;
  userId?: string;
}


const DashBoard = () => {
  const navigate = useNavigate();
  const [showLimitedtypes, setShowLimitedtypes] = useState(true);
  const [contents, setContents] = useState<Content[]>([]);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState<Types[]>([]);


  const token = localStorage.getItem("token");
  if (!token) {
    toast("Expired token, Please login");
    setTimeout(() => {
      navigate("/auth");
    }, 1000);
    return;
  }


  // Filtered content logic
  const filteredContents = selectedType === "All"
    ? contents
    : contents.filter((content) => content.typename.toLowerCase() === selectedType.toLowerCase());


  const typeSchema = z.object({
    typename: z.string().min(3, "type name cannot be less than 3 length").max(10, "type name cannot be more than 10 length")
  })

  const form = useForm<z.infer<typeof typeSchema>>({
    resolver: zodResolver(typeSchema),
    defaultValues: {
      typename: ""
    },
  });

  async function onSubmit(values: z.infer<typeof typeSchema>) {
    
    try {
      setLoading(true);

      const response = await axios.post(`${backend_url}/types`, JSON.stringify(values), {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });


      const { success, message } = response.data;
      if (success) {
        form.reset();
      }
      toast(message)

    } catch (error) {
      toast("Internal server error while adding types");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    const fetchContents = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          toast("Expired token, Please login");
          setTimeout(() => {
            navigate("/auth");
          }, 1000);
          return;
        }

        const response = await axios.get(
          `${backend_url}/contents`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            }
          }
        );

        const { contents, success, message } = response.data;
        if (success) {
          setContents(contents);
        } else {
          toast(message || "Internal server error")
        }


      } catch (error) {
        toast("Internal server error while fetching content")
      } finally {
        setLoading(false);
      }
    }



    const fetchTypes = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
          toast("Expired token, Please login");
          setTimeout(() => {
            navigate("/auth");
          }, 1000);
          return;
        }

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

    fetchContents();

  }, [loading]);



  const visibleTypes = showLimitedtypes ? types.slice(0, 6) : types;


  return (
    <div className="w-full bg-[#171717] rounded-md min-h-[750px] flex flex-col relative overflow-hidden">
      <div className="flex  items-center md:flex-row flex-wrap w-full p-3 bg-[#171717] border-b-2  border-black shadow-md justify-center gap-6">
        {visibleTypes.map((type, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            key={index}
            className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg cursor-pointer border border-[#594ef1] shadow-sm hover:bg-[#594ef1] transition ${selectedType == type.typename ? "bg-[#594ef1] text-white" : "hover:bg-[#594ef1] hover:text-white"}  `}
            onClick={() => setSelectedType(type.typename)}
          >
            <div className="text-xl">{DefaultIcons[type.typename] || <Globe2Icon />}</div>
            <div className="text-lg font-medium">{type.typename}</div>
          </motion.div> 
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onClick={() => setShowLimitedtypes((prev) => !prev)}
          className="flex items-center gap-1 text-white opacity-90 hover:text-[#594ef1] transition cursor-pointer" >
          {showLimitedtypes ? <> Expand <ExpandIcon /> </> : <> Collapse <CollapseIcon /> </>}
        </motion.div>


        <Dialog >
          <DialogTrigger asChild>
            <MyButton
              size="md"
              variant="primary"
              startIcon={<PlusIcon />}
              text="add new type"
              onClick={() => { }}
            />

          </DialogTrigger>


          <DialogContent className="flex bg-black border border-gray-500 text-white flex-col items-center justify-center absolute md:left-173 md:top-100 left-4 top-100 sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add <span className="text-[#594EF1]">new type</span></DialogTitle>
            </DialogHeader>


            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="typename"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Typename</FormLabel>
                      <FormControl>
                        <Input placeholder="your new type" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full cursor-pointer bg-[#594EF1] hover:bg-[#594ef1e0]"
                >
                  {loading ? "submiting..." : "submit"}
                </Button>
              </form>
            </Form>

          </DialogContent>
        </Dialog>
      </div>


      <div className="p-4 relative">
        <div className="flex items-center justify-center gap-2 absolute top-4 right-8">



          <Dialog >
            <DialogTrigger asChild>
              <MyButton
                size="md"
                variant="secondary"
                startIcon={<ShareICon size="md" />}
                text="Share U'r Brain"
                onClick={() => { }}
              />

            </DialogTrigger>


            <DialogContent className="flex bg-black border border-gray-500 text-white flex-col items-center justify-center absolute md:left-173 md:top-100 left-4 top-100 sm:max-w-md">
              <DialogHeader>
                <DialogTitle>You are sharing your brain</DialogTitle>
                <DialogDescription>
                  Anyone who get this link will be able to see your <span className="text-bold text-red-500">whole</span> brain data.
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

          <MyButton

            size="md"
            variant="primary"
            startIcon={<PlusIcon size="md" />}
            text="Add Content"
            onClick={() => {
              navigate("/addcontent")
            }}
          />

        </div>

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
          <ShinnyEffect left={10} top={10} size={400} />
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
          <ShinnyEffect right={10} top={10} size={400} />
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
          <ShinnyEffect left={50} top={400} size={400} />
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
          <ShinnyEffect right={100} top={100} size={400} />
        </motion.div>

        <div className="w-full mt-12 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center mx-auto">

          {
            filteredContents?.length == 0 ?
              (
                <div className="col-span-full text-center text-white py-8">
                  <p className="text-2xl font-semibold">No Content <span className="text-[#594EF1]">Found</span></p>
                  <p className="text-gray-400 mt-2">Try changing the filter or adding new content.</p>
                </div>
              )

              :

              (
                filteredContents?.map((content) => (

                  <Card
                    key={content._id}
                    id={content._id}
                    title={content.title}
                    content={content.content}
                    links={content.link}
                    type={content.typename}
                    tags={content.tags}
                    createdAt={content.createdAt}
                    // how to pass these two in this card
                    setContents={setContents}
                    contents={contents}
                  />

                )))
          }

        </div>
      </div>
    </div>
  );
};

export default DashBoard;
