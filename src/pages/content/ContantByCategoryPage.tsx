import {Box, Text} from "@chakra-ui/react";
import ContentCard from "@components/content/ContentCard.tsx";
import useNotionData from "@hooks/useNotionData.tsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import NotionApi from "@/api/NotionApi.tsx";

const ContentByCategoryPage = () => {
    // const {data, loading, error} = useNotionData();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const {recentPostApi} = NotionApi();

    const location = useLocation();

    useEffect(() => {
        recentPostApi()
            .then(setData)
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });
    }, [location]);

    if (error) {
        return <Text>Error loading content.</Text>;
    }

    return (
        <>
            <Box p={3} pt={10} minH="100vh" overflowY="auto" maxW={"880px"} mx="auto">
                <ContentCard data={data} loading={loading}/>
            </Box>
        </>
    );
};

export default ContentByCategoryPage;
