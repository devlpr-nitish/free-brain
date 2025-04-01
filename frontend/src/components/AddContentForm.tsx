import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PlusIcon from "@/icons/PlusIcon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { backend_url } from "@/utils/bakendUrl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@/icons/DeleteIcon";
import axios from "axios";

export const objectIdRegex = /^[a-f\d]{24}$/i;

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Title cannot be greater than 20 lenght"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(100000, "Content is too long (max 100,000 characters)"),
  links: z.array(z.string().url("Please add the valid links")).optional(),
  typeId: z.string().refine((id) => objectIdRegex.test(id), {
    message: "Invalid Type Selected",
  }),
  tags: z
    .array(
      z
        .string()
        .min(2, "Please add tag more than 2 length")
        .max(10, "Tag length cannot be greater than 10")
    )
    .optional(),
});



export interface Types {
  _id: string;
  typename: string;
  __v: number;
  userId?: string;
}

export function AddContentForm() {
  console.log("hello from add form");

  const [types, setTypes] = useState<Types[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      links: [""],
      typeId: "",
      tags: [""],
    },
  });


  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    console.log("Submitting")
    console.log(values);

    try {
      const token = localStorage.getItem("token");
      console.log(token);
      
      if (!token) { 
        toast('You must be logged in to add content');
        setTimeout(() => {
          navigate("/auth");
        }, 1500);
        return;
      }

      setLoading(true);
      console.log(values)

      const response = await axios.post(`${backend_url}/contents/`, JSON.stringify(values), {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },

      });

      console.log(response);

      form.reset();
    } catch (error) {
      console.log(error);
      toast("Inernal server error while adding content");
    } finally {
      setLoading(false);
    }
  }

  const links = form.watch("links") || [];

  const handleAddField = () => {
    form.setValue("links", [...links, ""]);
  };

  const handleRemoveField = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    form.setValue("links", newLinks.length > 0 ? newLinks : [""]);
  };


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
  }, [])




  return (
    <div className="p-14 rounded-md bg-transparent text-white relative overflow-hidden">


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="content" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="links"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Links</FormLabel>
                {links.map((link, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FormControl>
                      <Input
                        placeholder="link"
                        value={link}
                        onChange={(e) => {
                          const newLinks = [...links];
                          newLinks[index] = e.target.value;
                          form.setValue("links", newLinks);
                        }}
                      />
                    </FormControl>

                    {links.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveField(index)}
                        className="flex items-center bg-[#594ef13f] p-2 rounded-md text-white cursor-pointer hover:text-red-500"
                      >
                        <DeleteIcon />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddField}
                  className="cursor-pointer flex items-center text-blue-500 mt-2"
                >
                  <PlusIcon /> Add Another Link
                </button>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Content Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent className="bg-[#0A0A0A] flex flex-col gap-4 text-white outline-0 border-none">
                    {
                      types.filter((type) => type._id !== '67ec17abb1d00298145cfa99') // excluding 'All type'
                        .map((type, index) => (
                          <SelectItem key={index} value={type._id}>{type.typename}</SelectItem>
                        ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            onClick={() => console.log("Clicked")}
            type="submit"
            className="w-full cursor-pointer bg-[#594EF1] hover:bg-[#594ef1e0]"
          >
            {loading ? "submiting..." : "submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
