import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "@components/navigation/Navigation.tsx";
import {Box, Container, Stack} from "@chakra-ui/react";
import SideBar from "@pages/side_bar/SideBar.tsx";

function App() {

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
                <Navigation />
            </Box>

            {/* 고정된 왼쪽 SideBar */}
            <Box
                position="fixed"
                top={`${NAV_HEIGHT}px`}
                left={0}
                height={`calc(100vh - ${NAV_HEIGHT}px)`}
                width={`${SIDEBAR_WIDTH}px`}
                overflowY="auto"
                bg="gray.50"
                borderRight="1px solid #e2e8f0"
                p={4}
            >
                <SideBar />
            </Box>

            {/* 실제 컨텐츠 영역 */}
            <Box
                ml={`${SIDEBAR_WIDTH}px`}
                pt={`${NAV_HEIGHT}px`}
                minH="100vh"
                bg="white"
            >
                <Container maxW="1423px">
                    <Routes>
                        <Route
                            path="*"
                            element={<Box><h1>contents area</h1></Box>}
                        />
                    </Routes>
                </Container>
            </Box>
        </BrowserRouter>
    );
}

export default App
