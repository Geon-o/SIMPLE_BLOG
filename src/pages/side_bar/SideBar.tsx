import { Box, Card, Collapse, VStack } from "@chakra-ui/react";
import categories from "../../assets/categories.json";
import { useState } from "react";

const SideBar = () => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (categoryName: string) => {
        if (openCategory === categoryName) {
            setOpenCategory(null);
        } else {
            setOpenCategory(categoryName);
            setSelectedCategory(categoryName);
        }
    };

    const handleSubCategoryClick = (subCategoryName: string) => {
        setSelectedCategory(subCategoryName);
    };

    return (
        <>
            <Box w={"auto"}>
                {categories.map((category, index) => (
                    <Box key={index} w="100%">
                        <Card
                            p={2}
                            borderBottom="1px solid #ddd"
                            style={{ boxShadow: "none", cursor: "pointer" }}
                            bg={selectedCategory === category.name ? "gray.100" : "transparent"}
                            _hover={{ bg: "gray.100" }}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            {category.name}
                        </Card>
                        <Collapse in={openCategory === category.name} animateOpacity>
                            <VStack align="start" w="100%" pl={4} mt={2}>
                                {category.subCategories.map((subCategory, subIndex) => (
                                    <Box
                                        key={subIndex}
                                        p={2}
                                        w="100%"
                                        bg={selectedCategory === subCategory ? "gray.100" : "transparent"}
                                        _hover={{ bg: "gray.100" }}
                                        cursor="pointer"
                                        onClick={() => handleSubCategoryClick(subCategory)}
                                    >
                                        {subCategory}
                                    </Box>
                                ))}
                            </VStack>
                        </Collapse>
                    </Box>
                ))}
            </Box>
        </>
    );
};

export default SideBar;