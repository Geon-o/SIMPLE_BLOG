import {
    Box,
    Collapse,
    Container,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    useBreakpointValue,
    VStack,
} from "@chakra-ui/react";
import {CloseIcon, HamburgerIcon, SearchIcon} from "@chakra-ui/icons";
import BlogLogo from "@assets/logo/blog_logo.png";
import {useEffect, useState} from "react";
import type {CategoryPropsStatus} from "@/types/CategoryPropsStatus.tsx";
import {useNavigate} from "react-router-dom";
import useCategoryStore from "@store/categoryStore.ts";
import type {Categories, SubCategory} from "@store/categoryStore.ts";

const Navigation = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const isMobile = useBreakpointValue({base: true, md: false});
    const [selectedCategory, setSelectedCategory] = useState<CategoryPropsStatus>({
        category: "",
        subCategory: "",
    });
    const navigate = useNavigate();
    const { categories, loading, error, fetchInitialData, revalidateCategories } = useCategoryStore();

    const handleDrawerOpen = () => setIsDrawerOpen(true);
    const handleDrawerClose = () => setIsDrawerOpen(false);

    const handleCategoryClick = (category: Categories) => {
        setOpenCategory(prevOpenCategory => (prevOpenCategory === category.title ? null : category.title));
        setSelectedCategory({
            category: category.title,
            subCategory: null,
        });
        navigate(`/category${category.path}`);
        handleDrawerClose();
    };

    const handleSubCategoryClick = (subCategory: SubCategory) => {
        setSelectedCategory(prev => ({
            ...prev,
            subCategory: subCategory.title
        }));
        navigate(`/category${subCategory.path}`);
        handleDrawerClose();
    };

    return (
        <>
            <Box
                w="100%"
                h="70px"
                bg="white"
                p={4}
                borderBottom="1px solid #e2e8f0"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
            >
                <Container
                    maxW="1500px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {isMobile ? (
                        <>
                            <Box/>
                            <Image
                                h="60px"
                                src={BlogLogo}
                                alt="logo"
                                cursor="pointer"
                                onClick={() => (window.location.href = "/SIMPLE_BLOG/")}
                            />
                            <IconButton
                                aria-label="Open menu"
                                icon={<HamburgerIcon/>}
                                onClick={handleDrawerOpen}
                                variant="ghost"
                            />
                        </>
                    ) : (
                        <>
                            <Image
                                h="70px"
                                src={BlogLogo}
                                alt="logo"
                                cursor="pointer"
                                onClick={() => (window.location.href = "/SIMPLE_BLOG/")}
                            />
                            <InputGroup size="md" maxW="300px">
                                <Input type="text" placeholder="검색..."/>
                                <InputRightElement>
                                    <IconButton
                                        aria-label="Search database"
                                        icon={<SearchIcon/>}
                                        variant="outline"
                                        size="sm"
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </>
                    )}
                </Container>
            </Box>

            <Drawer isOpen={isDrawerOpen} placement="right" onClose={handleDrawerClose}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        <Flex justifyContent="space-between" alignItems="center">
                            메뉴
                            <IconButton
                                aria-label="Close menu"
                                icon={<CloseIcon/>}
                                onClick={handleDrawerClose}
                                variant="ghost"
                            />
                        </Flex>
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={4}>
                            <InputGroup>
                                <Input placeholder="검색..."/>
                                <InputRightElement>
                                    <IconButton
                                        aria-label="Search database"
                                        icon={<SearchIcon/>}
                                        variant="ghost"
                                    />
                                </InputRightElement>
                            </InputGroup>
                            <VStack align="start" w="100%">
                                {categories.map((category) => (
                                    <Box key={category.title} w="100%">
                                        <Box
                                            p={2}
                                            w="100%"
                                            _hover={{bg: "gray.100"}}
                                            cursor="pointer"
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {category.title}
                                        </Box>
                                        <Collapse in={openCategory === category.title} animateOpacity>
                                            <VStack align="start" w="100%" pl={4} mt={2}>
                                                {category.subCategory.map((subCategory) => (
                                                    <Box
                                                        key={subCategory.title}
                                                        p={2}
                                                        w="100%"
                                                        bg={selectedCategory.subCategory === subCategory.title ? "gray.100" : "transparent"}
                                                        _hover={{bg: "gray.100"}}
                                                        cursor="pointer"
                                                        onClick={() => handleSubCategoryClick(subCategory)}
                                                    >
                                                        {subCategory.title}
                                                    </Box>
                                                ))}
                                            </VStack>
                                        </Collapse>
                                    </Box>
                                ))}
                            </VStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Navigation;