import {useEffect, useState} from "react";
import NotionApi from "@/api/NotionApi.tsx";

export default function useNotionData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const {contentApi} = NotionApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await contentApi();
                setData(response);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [contentApi]);

    return {data, loading, error};
};

