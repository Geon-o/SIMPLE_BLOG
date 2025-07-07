import {useEffect, useState} from "react";
import {getNotionData} from "@/api/NotionApi.tsx";

export const useNotionData = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getNotionData()
            .then(setData)
            .catch(setError);
    }, []);

    return {data, error}
};

