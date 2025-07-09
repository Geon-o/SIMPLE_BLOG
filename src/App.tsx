import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "@components/navigation/Navigation.tsx";
import {Box, Container} from "@chakra-ui/react";
import SideBar from "@pages/side_bar/SideBar.tsx";
import { useState } from "react";
import RecentPostsPage from "@pages/content/RecentPostsPage.tsx";
import type {CategoryPropsStatus} from "@/types/CategoryPropsStatus.tsx";

function App() {
    const [selectedCategoryProps, setSelectedCategoryProps] = useState<CategoryPropsStatus>({ category: "최근게시물", subCategory: "" });

    const NAV_HEIGHT = 64; // Navigation 바 높이 (px)
    const SIDEBAR_WIDTH = 300; // SideBar 너비 (px)

    return (
        <BrowserRouter>
            {/* 고정된 상단 Navigation */}
            <Box
                position="fixed"
                top={0}
                left={0}
                right={0}
                zIndex={1000}
                height={`${NAV_HEIGHT}px`}
                bg="white"
                boxShadow="sm"
            >
                <Navigation setSelectedCategoryProps={setSelectedCategoryProps}/>
            </Box>

            <Container maxW="1493px" display="flex" pt={`${NAV_HEIGHT}px`}>
                {/* 고정된 왼쪽 SideBar */}
                <Box
                    as="aside"
                    position="sticky"
                    top={`${NAV_HEIGHT}px`}
                    height={`calc(100vh - ${NAV_HEIGHT}px)`}
                    width={`${SIDEBAR_WIDTH}px`}
                    overflowY="auto"
                    borderRight="1px solid #e2e8f0"
                    p={4}
                    flexShrink={0}
                    display={{ base: "none", md: "block" }}
                >
                    <SideBar setSelectedCategoryProps={setSelectedCategoryProps} />
                </Box>

                {/* 실제 컨텐츠 영역 */}
                <Box
                    as="main"
                    flex="1"
                    minH="100%"
                    bg="white"
                    p={4}
                    borderRight={{ base: "none", md: "1px solid #ddd" }}
                >
                    <Routes>
                        <Route
                            path="/SIMPLE_BLOG/"
                            element={<RecentPostsPage category={selectedCategoryProps}/>}
                        />
                    </Routes>
                </Box>
            </Container>
        </BrowserRouter>
    );
}

export default App
