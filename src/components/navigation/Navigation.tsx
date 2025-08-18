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
import categories from "@assets/categories.json";
import type {CategoryHandlerProps} from "@/types/CategoryHandlerProps.tsx";
import type {CategoryPropsStatus} from "@/types/CategoryPropsStatus.tsx";
import {useNavigate} from "react-router-dom";

const Navigation = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const isMobile = useBreakpointValue({base: true, md: false});
    const [selectedCategory, setSelectedCategory] = useState<CategoryPropsStatus>({
        category: "",
        subCategory: "",
    });
    const navigate = useNavigate();

    const handleDrawerOpen = () => setIsDrawerOpen(true);
    const handleDrawerClose = () => setIsDrawerOpen(false);

    const handleCategoryClick = (category: any) => {
        setOpenCategory(prevOpenCategory => (prevOpenCategory === category.name ? null : category.name));
        setSelectedCategory({
            category: category.name,
            subCategory: null,
        });

        if (category.subCategories.length === 0) {
            navigate(category.url);
            handleDrawerClose();
        }
    };

    const handleSubCategoryClick = (subCategory: any) => {
        setSelectedCategory(prev => ({
            ...prev,
            subCategory: subCategory.name
        }));
        navigate(subCategory.url);
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
                                onClick={() => (window.location.href = "/SIMPLE_BLOG/category/recent")}
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
                                onClick={() => (window.location.href = "/SIMPLE_BLOG/category/recent")}
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
                                    <Box key={category.name} w="100%">
                                        <Box
                                            p={2}
                                            w="100%"
                                            _hover={{bg: "gray.100"}}
                                            cursor="pointer"
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            {category.name}
                                        </Box>
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
                            </VStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Navigation;