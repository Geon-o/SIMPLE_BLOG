import {
    Box,
    Card,
    CardBody,
    Heading, HStack, Image,
    Stack, Tag,
    Text,
    VStack
} from "@chakra-ui/react";
import SkeletonCard from "@components/content/SkeletonCard.tsx";
import {useNavigate} from "react-router-dom";

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const ContentCard = ({data, loading}: { data: any[], loading: boolean }) => {
    const navigate = useNavigate();
    if (loading) {
        return (
            <VStack spacing={8}>
                {[...Array(10)].map((_, index) => (
                    <SkeletonCard key={index}/>
                ))}
            </VStack>
        );
    }

    return (
        <>
            <VStack spacing={8}>
                {data?.map((item: any) => {
                    const createdDate = formatDate(item?.created_time);
                    const lastEditedDate = formatDate(item?.last_edited_time);
                    const displayDate = createdDate === lastEditedDate ? `${createdDate}` : `${lastEditedDate}`;
                    const imageUrl = item?.properties.imageUrl.files[0]?.file.url || 'https://picsum.photos/400/300?random=1';

                    return (
                        <Box
                            key={item?.properties?.ID.unique_id.number}
                            w="100%"
                            p={4}
                            borderBottom="1px solid #e2e8f0"
                            cursor="pointer"
                            onClick={() => navigate('/post', { state: { pageId: item.id } })}
                            _hover={{ bg: 'gray.50' }}
                        >
                            <HStack spacing={8}>
                                <Image
                                    objectFit='cover'
                                    boxSize="150px"
                                    src={imageUrl}
                                    alt={imageUrl}
                                    borderRadius="md"
                                />
                                <VStack align="start" spacing={2}>
                                    <Heading size='md'>
                                        {item?.properties.content.title[0].plain_text}
                                    </Heading>
                                    <Text color="gray.500" noOfLines={2}>
                                        {item?.properties.summary.rich_text[0].plain_text}
                                    </Text>
                                    <HStack spacing={2} mt={2}>
                                        {item?.properties.tag.multi_select.map((tag: any) => (
                                            <Tag key={tag.id} size="sm" variant="subtle" colorScheme="gray">
                                                {tag.name}
                                            </Tag>
                                        ))}
                                    </HStack>
                                    <Text fontSize="sm" color="gray.400">
                                        {displayDate}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    );
                })}
            </VStack>
        </>
    );
};


