import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import BlogLogo from "@assets/logo/blog_logo.png";
import { useState } from "react";
import categories from "@assets/categories.json";

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

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
              <Box /> 
              <Image
                h="60px"
                src={BlogLogo}
                alt="logo"
                cursor="pointer"
                onClick={() => (window.location.href = "/")}
              />
              <IconButton
                aria-label="Open menu"
                icon={<HamburgerIcon />}
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
                onClick={() => (window.location.href = "/")}
              />
              <InputGroup size="md" maxW="300px">
                <Input type="text" placeholder="검색..." />
                <InputRightElement>
                  <IconButton
                    aria-label="Search database"
                    icon={<SearchIcon />}
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
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">메뉴</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4}>
              <InputGroup>
                <Input placeholder="검색..." />
                <InputRightElement>
                  <IconButton
                    aria-label="Search database"
                    icon={<SearchIcon />}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>
              <VStack align="start" w="100%">
                {categories.map((category, index) => (
                  <Box
                    key={index}
                    p={2}
                    w="100%"
                    _hover={{ bg: "gray.100" }}
                    cursor="pointer"
                  >
                    {category}
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