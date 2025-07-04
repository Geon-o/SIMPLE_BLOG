import {useEffect, useState} from "react";
import {getNotionData} from "@/api/NotionApi.tsx";

export const UseNotionData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        getNotionData()
            .then(data => {
                setData(data);
            })
            .catch(setError);
    }, []);

    return {data, error}
};

