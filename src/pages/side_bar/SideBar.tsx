import {Box, Card, Collapse, VStack} from "@chakra-ui/react";
import categories from "../../assets/categories.json";
import {useEffect, useState} from "react";
import type {CategoryHandlerProps} from "@/types/CategoryHandlerProps.tsx";
import type {CategoryPropsStatus} from "@/types/CategoryPropsStatus.tsx";
import {useNavigate} from "react-router-dom";

const SideBar = ({setSelectedCategoryProps}: CategoryHandlerProps) => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoryPropsStatus>({
        category: "최근게시물",
        subCategory: "",
    });
    const navigate = useNavigate();

    const handleCategoryClick = (category: any) => {
        if (openCategory === category.name) {
            setOpenCategory(null);
        } else {
            setOpenCategory(category.name);
        }
        setSelectedCategory({
            category: category.name,
            subCategory: null,
        });
        navigate(category.url);
    };

    const handleSubCategoryClick = (subCategory: any) => {
        setSelectedCategory(prev => ({
            ...prev,
            subCategory: subCategory.name
        }));
        navigate(subCategory.url);
    };

    useEffect(() => {
        const currentCategory = categories.find(c => c.name === selectedCategory.category);
        if (currentCategory && selectedCategory.subCategory) {
            if (!currentCategory.subCategories.some(sc => sc.name === selectedCategory.subCategory)) {
                setSelectedCategory(prev => ({ ...prev, subCategory: "" }));
            }
        }
        setSelectedCategoryProps(selectedCategory);
    }, [selectedCategory, setSelectedCategoryProps]);

    return (
        <>
            <Box w={"auto"}>
                {categories.map((category) => (
                    <Box key={category.name} w="100%">
                        <Card
                            p={2}
                            borderBottom="1px solid #ddd"
                            style={{boxShadow: "none", cursor: "pointer"}}
                            bg={selectedCategory.category === category.name && !selectedCategory.subCategory ? "gray.100" : "transparent"}
                            _hover={{bg: "gray.100"}}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category.name}
                        </Card>
                        <Collapse in={openCategory === category.name} animateOpacity>
                            <VStack align="start" w="100%" pl={4} mt={2}>
                                {category.subCategories.map((subCategory) => (
                                    <Box
                                        key={subCategory.name}
                                        p={2}
                                        w="100%"
                                        bg={selectedCategory.subCategory === subCategory.name ? "gray.100" : "transparent"}
                                        _hover={{bg: "gray.100"}}
                                        cursor="pointer"
                                        onClick={() => handleSubCategoryClick(subCategory)}
                                    >
                                        {subCategory.name}
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