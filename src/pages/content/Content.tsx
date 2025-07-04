import { Box } from "@chakra-ui/react";

interface ContentProps {
    selectedCategory: string | null;
}

const Content = ({ selectedCategory }: ContentProps) => {
    return (
        <Box borderRight="1px solid #ddd" p={4} minH="100vh" overflowY="auto">
            <h1>contents area</h1>
            {selectedCategory && <p>Selected Category: {selectedCategory}</p>}
        </Box>
    );
};

export default Content;