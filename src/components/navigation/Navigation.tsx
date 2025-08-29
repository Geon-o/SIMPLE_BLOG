import {
    Box,
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
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {TagCloudSidebar} from "@/pages/side_bar/TagCloudSideBar.tsx";

interface NavigationProps {
    onTagClick: (tag: string | null) => void;
    selectedTag: string | null;
}

const Navigation = ({ onTagClick, selectedTag }: NavigationProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useBreakpointValue({base: true, md: false});
    const navigate = useNavigate();

    const handleDrawerOpen = () => setIsDrawerOpen(true);
    const handleDrawerClose = () => setIsDrawerOpen(false);

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
                            <TagCloudSidebar onTagClick={(tag) => { onTagClick(tag); handleDrawerClose(); }} selectedTag={selectedTag} />
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Navigation;