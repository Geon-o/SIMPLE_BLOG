import {Box, Card, Collapse, VStack} from "@chakra-ui/react";
import categories from "../../assets/categories.json";
import {useEffect, useState} from "react";
import type {CategoryHandlerProps} from "@/types/CategoryHandlerProps.tsx";
import type {CategoryPropsStatus} from "@/types/CategoryPropsStatus.tsx";

const SideBar = ({setSelectedCategoryProps}: CategoryHandlerProps) => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoryPropsStatus>({
        category: "최근게시물",
        subCategory: "",
    });

    const handleCategoryClick = (categoryName: string) => {
        if (openCategory === categoryName) {
            setOpenCategory(null);
            setSelectedCategory({
                category: categoryName,
                subCategory: null,
            });
        } else {
            setOpenCategory(categoryName);
            setSelectedCategory({
                category: categoryName,
                subCategory: selectedCategory.subCategory,
            });
        }
    };

    const handleSubCategoryClick = (subCategoryName: string) => {
        setSelectedCategory({
            category: selectedCategory.category,
            subCategory:subCategoryName
        });
    };

    useEffect(() => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].name === selectedCategory.category) {
                if (categories[i].subCategories.indexOf(selectedCategory.subCategory) === -1) {
                    setSelectedCategory({
                        category: selectedCategory.category,
                        subCategory: ""
                    })
                }
                break;
            }
        }
        setSelectedCategoryProps(selectedCategory);

    }, [selectedCategory.category, selectedCategory.subCategory]);

    return (
        <>
            <Box w={"auto"}>
                {categories.map((category, index) => (
                    <Box key={index} w="100%">
                        <Card
                            p={2}
                            borderBottom="1px solid #ddd"
                            style={{boxShadow: "none", cursor: "pointer"}}
                            bg={selectedCategory.category === category.name ? "gray.100" : "transparent"}
                            _hover={{bg: "gray.100"}}
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
                                        bg={selectedCategory.subCategory === subCategory ? "gray.100" : "transparent"}
                                        _hover={{bg: "gray.100"}}
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