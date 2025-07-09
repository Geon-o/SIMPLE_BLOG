import {useEffect, useState} from "react";
import NotionApi from "@/api/NotionApi.tsx";

export default function useNotionData() {
    const [data, setData] = useState([]);
    const [error, setError] = useState<Error | null>(null);
    const {contentApi} = NotionApi();

    const getContent = () => {
        useEffect(() => {
            contentApi()
                .then(setData)
                .catch(setError);
        }, []);

        return {data, error}
    };

    return {
        getContent
    };
};

