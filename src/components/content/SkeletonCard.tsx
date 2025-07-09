import {
    Card,
    CardBody,
    Skeleton,
    SkeletonText,
    Stack,
    HStack
} from "@chakra-ui/react";

const SkeletonCard = () => {
    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            borderRadius="lg"
            boxShadow="md"
            w="100%"
        >
            <Skeleton width={{ base: '100%', sm: '200px' }} height={{ base: '150px', sm: 'auto' }} />
            <Stack w="100%">
                <CardBody>
                    <Skeleton height="20px" width="80%" mb="4" />
                    <SkeletonText mt="4" noOfLines={3} spacing="4" />
                    <Skeleton height="15px" width="50%" mt="4" ml="auto" />
                    <HStack spacing={2} mt={2}>
                        <Skeleton height="20px" width="50px" />
                        <Skeleton height="20px" width="50px" />
                    </HStack>
                </CardBody>
            </Stack>
        </Card>
    );
};

export default SkeletonCard;
