import {useEffect, useState} from "react";
import NotionApi from "@/api/NotionApi.tsx";

export default function useNotionData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const {recentPostApi} = NotionApi();

    useEffect(() => {
        recentPostApi()
          .then(setData)
          .catch(setError)
          .finally(() => {
              setLoading(false);
          });
    }, []);

    return {data, loading, error};
};

