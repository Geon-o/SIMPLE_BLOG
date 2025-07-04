import { Box, Card } from "@chakra-ui/react";
import categories from "../../assets/categories.json";

interface SideBarProps {
    setSelectedCategory: (category: string | null) => void;
}

const SideBar = ({ setSelectedCategory }: SideBarProps) => {

    return (
        <>
            <Box w={'auto'}>
                {categories.map((category, index) => (
                    <Card
                        key={index}
                        p={2}
                        borderBottom="1px solid #ddd"
                        style={{ boxShadow: "none", cursor: "pointer" }}
                        _hover={{ bg: "gray.100" }}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </Card>
                ))}
            </Box>
        </>
    );
};

export default SideBar;