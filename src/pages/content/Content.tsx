import { Box } from "@chakra-ui/react";
import ContentCard from "@components/ContentCard.tsx";

const Content = () => {

    return (
        <Box p={3} pt={20} minH="100vh" overflowY="auto" maxW={"880px"} mx="auto">
            <ContentCard/>
        </Box>
    );
};

export default Content;