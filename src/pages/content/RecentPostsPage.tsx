import {Box, Text, VStack} from "@chakra-ui/react";
import {ContentCard} from "@components/content/ContentCard.tsx";
import useNotionData from "@hooks/useNotionData.tsx";

interface RecentPostsPageProps {
    selectedTag: string | null;
}

export const RecentPostsPage = ({ selectedTag }: RecentPostsPageProps) => {
    const {data, loading, error} = useNotionData();

    if (error) {
        return <Text>Error loading content.</Text>;
    }

    const filteredData = selectedTag
        ? data.filter((item: any) =>
            item.properties.tag.multi_select.some((t: any) => t.name === selectedTag)
        )
        : data;

    return (
        <>
            <Box pt={16} minH="100vh" overflowY="auto" maxW={"880px"} mx="auto">
                <ContentCard data={filteredData} loading={loading}/>
            </Box>
        </>
    );
};