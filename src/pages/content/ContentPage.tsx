import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import ContentCard from "@components/content/ContentCard.tsx";
import useNotionData from "@hooks/useNotionData.tsx";
import type {CategoryPropsStatus} from "@types/CategoryPropsStatus.tsx";

const ContentPage = (categoryProps: CategoryPropsStatus) => {
    const {getContent} = useNotionData();
    const dataList = [];

    for (let i = 0; i < 8; i++) {
        dataList.push(getContent().data[i]);
    }

    return (
        <>
            <HStack>
                <Text style={{fontSize: categoryProps.category?.subCategory ? "20px" : "25px", fontWeight: "bold", textAlign: "left"}}>
                    {categoryProps.category?.category}
                </Text>
                {categoryProps.category?.subCategory && (
                    <Text style={{fontSize: categoryProps.category?.subCategory ? "25px" : "20px", fontWeight: "bold", textAlign: "left"}}>
                        {` > ${categoryProps.category?.subCategory}`}
                    </Text>
                )}
            </HStack>

            <Box p={3} pt={10} minH="100vh" overflowY="auto" maxW={"880px"} mx="auto">
                <ContentCard data={dataList}/>
            </Box>
        </>
    );
};

export default ContentPage;