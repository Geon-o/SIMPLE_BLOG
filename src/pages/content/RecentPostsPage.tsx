import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import ContentCard from "@components/content/ContentCard.tsx";
import useNotionData from "@hooks/useNotionData.tsx";
import type {CategoryPropsStatus} from "@/types/CategoryPropsStatus.tsx";

const RecentPostsPage = ({ category }: { category: CategoryPropsStatus }) => {
    const {data, loading, error} = useNotionData();

    if (error) {
        return <Text>Error loading content.</Text>;
    }

    return (
        <>
            <HStack>
                <Text style={{fontSize: category.subCategory ? "20px" : "25px", fontWeight: "bold", textAlign: "left"}}>
                    {category.category}
                </Text>
                {category.subCategory && (
                    <Text style={{fontSize: category.subCategory ? "25px" : "20px", fontWeight: "bold", textAlign: "left"}}>
                        {` > ${category.subCategory}`}
                    </Text>
                )}
            </HStack>

            <Box p={3} pt={10} minH="100vh" overflowY="auto" maxW={"880px"} mx="auto">
                <ContentCard data={data} loading={loading}/>
            </Box>
        </>
    );
};

export default RecentPostsPage;