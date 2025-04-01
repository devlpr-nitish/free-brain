import { Types } from "@/pages/DashBoard";
import { backend_url } from "@/utils/bakendUrl";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";


interface TypeContextType {
    types: Types[];
    loading: boolean
}

const TypesContext = createContext<TypeContextType | undefined>(undefined);


export const TypesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [types, setTypes] = useState<Types[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const token = localStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            setLoading(false);
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
        <TypesContext.Provider value={{ types, loading }}>
            {children}
        </TypesContext.Provider>
    )
}