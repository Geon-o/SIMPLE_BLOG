import { Box, VStack, Text, Collapse } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCategoryStore from '@/store/categoryStore.ts';
import type { Categories, SubCategory } from '@/store/categoryStore.ts';

const CategorySideBar = () => {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
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

    const handleCategoryClick = (category: Categories) => {
        if (openCategory === category.title) {
            setOpenCategory(null);
        } else {
            setOpenCategory(category.title);
        }
        navigate(`/category${category.path}`);
    };

    const handleSubCategoryClick = (subCategory: SubCategory) => {
        navigate(`/category${subCategory.path}`);
    };

    if (loading && categories.length === 0) {
        return (
            <VStack p={2} spacing={4} align="stretch">
                <Text>Loading...</Text>
            </VStack>
        );
    }

    if (error) {
        return <Text>Error loading categories.</Text>;
    }

    return (
        <Box w="100%" p={4}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>Categories</Text>
            <VStack align="start" spacing={2} w="100%">
                <Text 
                    cursor="pointer" 
                    onClick={() => navigate('/')}
                    _hover={{ color: 'blue.500' }}
                >
                    Recent Posts
                </Text>
                {categories.map((category) => (
                    <Box key={category.title} w="100%">
                        <Text 
                            cursor="pointer" 
                            onClick={() => handleCategoryClick(category)}
                            _hover={{ color: 'blue.500' }}
                            fontWeight={openCategory === category.title ? 'bold' : 'normal'}
                        >
                            {category.title}
                        </Text>
                        <Collapse in={openCategory === category.title} animateOpacity>
                            <VStack align="start" pl={4} mt={2} spacing={1}>
                                {category.subCategory.map((sub) => (
                                    <Text 
                                        key={sub.title}
                                        cursor="pointer" 
                                        onClick={() => handleSubCategoryClick(sub)}
                                        _hover={{ color: 'blue.500' }}
                                        fontSize="sm"
                                    >
                                        {sub.title}
                                    </Text>
                                ))}
                            </VStack>
                        </Collapse>
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default CategorySideBar;
