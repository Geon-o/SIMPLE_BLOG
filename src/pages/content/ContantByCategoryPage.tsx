import {Box, Text} from "@chakra-ui/react";
import ContentCard from "@components/content/ContentCard.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NotionApi from "@/api/NotionApi.tsx";

const ContentByCategoryPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const {contentByCategoryApi} = NotionApi();
    const {mainCategory, subCategory} = useParams<{ mainCategory: string; subCategory?: string }>();

    const categoryToFetch = subCategory || mainCategory;

    useEffect(() => {
        const fetchContent = async () => {
            if (!categoryToFetch) return;

            setLoading(true);
            setError(null);
            try {
                const results = await contentByCategoryApi(categoryToFetch);
                setData(results);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [categoryToFetch]);

    if (error) {
        return <Text>Error loading content: {error.message}</Text>;
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
