import { backend_url } from "@/utils/bakendUrl";
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export const useFetchGet = (url: string) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast("Expired token, Please login");
            setTimeout(() => {
                navigate("/auth");
            }, 1000);
            return;
        }

        async function fetchData() {
            try {

                setLoading(true);

                const response = await axios.get(backend_url + url, {
                    headers: {
                        Authorization: token,
                        'Content-Type': "Application/json"
                    }
                })

                setData(response.data);
            } catch (error) {
                setError("Internal Server error");
            } finally {
                setLoading(false);
            }
        }


        fetchData();
    }, [url])

    return { data, error, loading }
}

export const useFetchPost = (url: string) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast("Expired token, Please login");
            setTimeout(() => {
                navigate("/auth");
            }, 1000);
            return;
        }
        async function fetchData() {
            try {

                setLoading(true);

                const response = await axios.post(backend_url + url, {
                    headers: {
                        Authorization: token,
                        'Content-Type': "Application/json"
                    }
                })

                setData(response.data);
            } catch (error) {
                setError("Internal Server error");
            } finally {
                setLoading(false);
            }
        }


        fetchData();
    }, [url])

    return { data, error, loading }
}