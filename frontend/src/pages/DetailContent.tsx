
import { formatDate } from "@/components/Self/Card";
import { MyButton } from "@/components/Self/MyButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DeleteIcon from "@/icons/DeleteIcon";
import ShareICon from "@/icons/ShareICon";
import { Copy, LinkIcon, Shapes, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";


import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ShinnyEffect from "@/components/ShinnyEffect";
import axios from "axios";
import { backend_url } from "@/utils/bakendUrl";
import { toast } from "sonner";




const DetailContent = () => {
    const { id } = useParams();
    const [contentDetail, setContentDetail] = useState({});
    const navigate = useNavigate();

    const { content, link, tags, title, typename, createdAt }: any = contentDetail;

    useEffect(() => {

        const fetchContentById = async () => {

            try {

                const token = localStorage.getItem("token");
                if (!token) {
                    toast("Expired token, Please login");
                    setTimeout(() => {
                        navigate("/auth");
                    }, 1000);
                    return;
                }


                const response = await axios.get(`${backend_url}/contents/${id}`, {
                    headers: {
                        Authorization: `${token}`,
                        'Content-Type': 'application/json',
                    }
                })

                const { success, content } = response.data;
                setContentDetail(content);

            } catch (error) {

            } finally {

            }
        }

        fetchContentById()
    })



    return (
        <div className='w-full md:px-36 py-10 min-h-[750px] bg-[#171717]  rounded-md flex flex-col relative overflow-hidden'>

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


            <div className="flex md:justify-between items-center flex-col md:flex-row ">

                <div className="flex items-center gap-4">
                    <h1 className='text-center text-[#594ef1] py-4 md:text-4xl md:font-5xl text-2xl font-bold'>{title}</h1>
                    <div className="text-gray-400 flex  items-center gap-2 opacity-80">
                        <div className="">
                            <Shapes className="" />
                        </div>
                        <div className="">{typename}</div>
                    </div>
                </div>

                <div className="flex justify-between gap-4 max-h-10 ">
                    <Button title="copy content" type="submit" size="lg" className="px-3 cursor-pointer hover:text-[#594ef1]">
                        <span className="sr-only">Copy</span>
                        <Copy />
                    </Button>




                    <Dialog >
                        <DialogTrigger asChild>
                            <MyButton
                                text="share"
                                variant="secondary"
                                startIcon={<ShareICon />}
                                size="md"
                            />

                        </DialogTrigger>


                        <DialogContent className="flex bg-black border border-gray-500 text-white flex-col items-center justify-center absolute md:left-173 md:top-100 left-4 top-100 sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>You are sharing your brain</DialogTitle>
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
                            <MyButton
                                text="delete"
                                variant="primary-delete"
                                startIcon={<DeleteIcon />}
                                size="md"
                            />
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
                                    />
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>

            <div className="content py-6 md:px-0 px-6 ">
                <p className="text-gray-100 text-md leading-relaxed">
                    {content}
                </p>
            </div>

            <div className="flex flex-col w-full md:px-0 px-6">
                <div className="flex items-center gap-2">
                    <h1 className='text-center text-gray-300 py-4 text-xl md:text-2xl'>Links</h1>
                    <LinkIcon className="text-center text-sm text-[#594ef1]" />
                </div>

                <div className="flex flex-wrap gap-4 ">

                    {

                        link?.length == 0 ? (
                            <div className="col-span-full text-center text-white py-8">
                                <p className="text-2xl font-semibold">No Link <span className="text-[#594EF1]">Found</span></p>
                                <p className="text-gray-400 mt-2">You haven't added any link for this content.</p>
                            </div>
                        )

                            :
                            (
                                link?.map((l: string, index: number) => (

                                    <div key={index} className="flex flex-row items-center gap-2 py-2 px-4 rounded-md bg-[#594ef1] w-fit">
                                        <Label htmlFor="link" className="sr-only">
                                            Link
                                        </Label>
                                        <Input
                                            id="link"
                                            value={l}
                                            readOnly
                                        />

                                        <Button type="submit" size="sm" className="px-3 cursor-pointer hover:text-[#594ef1]">
                                            <span className="sr-only">Copy</span>
                                            <Copy />
                                        </Button>
                                    </div>


                                )))
                    }

                </div>


            </div>

            <div className="py-6 flex flex-col w-full md:px-0 px-6">
                <div className="flex items-center gap-2">
                    <h1 className='text-center text-gray-300 py-4 text-2xl'>Tags</h1>
                    <span className="text-center text-2xl text-[#594ef1]" >#</span>
                </div>

                <div className="flex flex-wrap gap-4 ">
                    {
                        tags?.length == 0 ? (
                            <div className="col-span-full text-center text-white py-8">
                                <p className="text-2xl font-semibold">No Tags <span className="text-[#594EF1]">Found</span></p>
                                <p className="text-gray-400 mt-2">You haven't added any tags for this content.</p>
                            </div>
                        )

                            :
                            (
                                tags?.map((tag: string, index: number) => (
                                    <div key={index} className="text-[#594ef1] px-2 bg-white rounded-md text-md">{`# ${tag}`}</div>
                                )))
                    }

                </div>
            </div>

            <div className="text-gray-400 text-end md:px-0 px-6">
                posted at : {formatDate(createdAt)}
            </div>

        </div>
    )
}

export default DetailContent;