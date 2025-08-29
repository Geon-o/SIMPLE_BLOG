import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navigation from "@components/navigation/Navigation.tsx";
import {Box, Container} from "@chakra-ui/react";
import {RecentPostsPage} from "@pages/content/RecentPostsPage.tsx";
import {DetailContentViewPage} from "@pages/content/DetailContentViewPage.tsx";
import {useEffect, useState} from "react";
import {TagCloudSidebar} from "@/pages/side_bar/TagCloudSideBar.tsx";

const RedirectOnRefresh = () => {
    useEffect(() => {
        const navigationEntries = performance.getEntriesByType("navigation");
        if (navigationEntries.length > 0 && (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload') {
            window.location.href = "/SIMPLE_BLOG/";
        }
    }, []);
    return null;
};


function App() {
    const NAV_HEIGHT = 64; // Navigation 바 높이 (px)
    const SIDEBAR_WIDTH = 240; // SideBar 너비 (px)
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const handleTagClick = (tag: string) => {
        setSelectedTag(tag === selectedTag ? null : tag);
    };

    return (
        <BrowserRouter basename={"/SIMPLE_BLOG"}>
            <RedirectOnRefresh />
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
                <Navigation onTagClick={handleTagClick} selectedTag={selectedTag} />
            </Box>

            <Box position="relative" pt={`${NAV_HEIGHT}px`}>
                {/* 고정된 왼쪽 SideBar */}
                <Box
                    as="aside"
                    position="absolute"
                    left={0}
                    top={`${NAV_HEIGHT}px`}
                    height={`calc(100vh - ${NAV_HEIGHT}px)`}
                    width={`${SIDEBAR_WIDTH}px`}
                    overflowY="auto"
                    borderRight="1px solid #e2e8f0"
                    p={4}
                    display={{base: "none", md: "block"}}
                >
                    <TagCloudSidebar onTagClick={handleTagClick} selectedTag={selectedTag} />
                </Box>

                {/* 실제 컨텐츠 영역 */}
                <Box
                    as="main"
                    width="100%"
                    minH="100%"
                    bg="white"
                    p={4}
                >
                    <Routes>
                        <Route
                            path="/"
                            element={<RecentPostsPage selectedTag={selectedTag} />}
                        />
                        <Route
                            path="/post"
                            element={<DetailContentViewPage/>}
                        />
                    </Routes>
                </Box>
            </Box>
        </BrowserRouter>
    );
}

export default App