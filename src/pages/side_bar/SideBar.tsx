import {Box, Card, Collapse, VStack, Skeleton, Text} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import type {CategoryPropsStatus} from "@/types/CategoryPropsStatus.tsx";
import {useNavigate} from "react-router-dom";
import useCategoryStore from "@/store/categoryStore.ts";

const SideBar = () => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CategoryPropsStatus>({
        category: "최근게시물",
        subCategory: "",
    });
    const navigate = useNavigate();

    const { categories, loading, error, fetchInitialData, revalidateCategories } = useCategoryStore();

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    useEffect(() => {
        const handleRevalidation = () => {
            if (document.visibilityState === 'visible') {
                revalidateCategories();
            }
        };

        window.addEventListener('visibilitychange', handleRevalidation);
        window.addEventListener('focus', handleRevalidation);

        return () => {
            window.removeEventListener('visibilitychange', handleRevalidation);
            window.removeEventListener('focus', handleRevalidation);
        };
    }, [revalidateCategories]);

    const handleCategoryClick = (category: any) => {
        if (openCategory === category.title) {
            setOpenCategory(null);
        } else {
            setOpenCategory(category.title);
        }
        setSelectedCategory({
            category: category.title,
            subCategory: null,
        });
        navigate(`/category${category.path}`);
    };

    const handleSubCategoryClick = (subCategory: any) => {
        setSelectedCategory(prev => ({
            ...prev,
            subCategory: subCategory.title
        }));
        navigate(`/category${subCategory.path}`);
    };

    useEffect(() => {
        const currentCategory = categories.find(c => c.title === selectedCategory.category);
        if (currentCategory && selectedCategory.subCategory) {
            if (!currentCategory.subCategory.some(sc => sc.title === selectedCategory.subCategory)) {
                setSelectedCategory(prev => ({ ...prev, subCategory: "" }));
            }
        }
    }, [selectedCategory, categories]);

    if (loading && categories.length === 0) {
        return (
            <VStack p={2} spacing={4} align="stretch">
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
                <Skeleton height="40px" />
            </VStack>
        );
    }

    if (error) {
        return <Text>카테고리 목록을 불러오던 중 에러가 발생했습니다. <br/> 새로고침을 해주세요.</Text>;
    }

    return (
      <>
          <Box w={"auto"}>
              <Box w={"100%"}>
                  <Card p={2}
                        borderBottom="1px solid #ddd"
                        style={{boxShadow: "none", cursor: "pointer"}}
                        bg={ selectedCategory.category === "최근게시물" && !selectedCategory.subCategory ? "gray.100" : "transparent"}
                        _hover={{bg: "gray.100"}}
                        onClick={() => {
                            window.location.href = "/SIMPLE_BLOG/";
                            setSelectedCategory({
                                category: "최근게시물",
                                subCategory: null,
                            });
                        }}
                    >
                      최근게시물
                  </Card>

              </Box>
              {categories.map((category) => (
                <Box key={category.title} w="100%">
                    <Card
                      p={2}
                      borderBottom="1px solid #ddd"
                      style={{boxShadow: "none", cursor: "pointer"}}
                      bg={selectedCategory.category === category.title && !selectedCategory.subCategory ? "gray.100" : "transparent"}
                      _hover={{bg: "gray.100"}}
                      onClick={() => handleCategoryClick(category)}
                    >
                        {category.title}
                    </Card>
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
          </Box>
      </>
    );
};

export default SideBar;
