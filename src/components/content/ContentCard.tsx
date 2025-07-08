import {
    Card,
    CardBody,
    Heading, HStack, Image,
    Stack, Tag,
    Text,
    VStack
} from "@chakra-ui/react";
import {useNotionData} from "@hooks/useNotionData.tsx";

const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const ContentCard = (data: any) => {
    return (
        <>
            <VStack spacing={8}>
                {data?.data?.map((item: any) => {
                    const createdDate = formatDate(item?.created_time);
                    const lastEditedDate = formatDate(item?.last_edited_time);
                    const displayDate = createdDate === lastEditedDate ? `${createdDate}` : `${lastEditedDate}`;

                    return (
                        <Card
                            key={item?.properties?.ID.unique_id.number}
                            direction={{ base: 'column', sm: 'row' }}
                            overflow='hidden'
                            variant='outline'
                            borderRadius="lg"
                            boxShadow="md"
                            transition="all 0.2s ease-in-out"
                            _hover={{
                                transform: 'translateY(-5px)',
                                boxShadow: 'xl',
                            }}
                            w="100%"
                        >
                            <Image
                                objectFit='cover'
                                maxW={{ base: '100%', sm: '200px' }}
                                src={item?.properties.imageUrl.rich_text[0].plain_text}
                                alt={item?.properties.content.title[0].plain_text}
                            />
                            <Stack w="100%">
                                <CardBody>
                                    <Heading size='md'>
                                        {item?.properties.content.title[0].plain_text}
                                    </Heading>

                                    <Text py='7'>
                                        {item?.properties.summary.rich_text[0].plain_text}
                                    </Text>

                                    <Text fontSize="sm" color="gray.500" mt={4} textAlign="right">
                                        {displayDate}
                                    </Text>

                                    <HStack spacing={2} mt={2}>
                                        {item?.properties.tag.multi_select.map((tag) => (
                                            <Tag key={tag.id} size="sm" variant="solid" colorScheme={'blackAlpha'}>
                                                {tag.name}
                                            </Tag>
                                        ))}
                                    </HStack>
                                </CardBody>
                            </Stack>
                        </Card>
                    );
                })}
            </VStack>
        </>
    );
};

export default ContentCard;
