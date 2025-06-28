import {Box, Card} from "@chakra-ui/react";
import {UseNotionData} from "@hooks/useNotionData.tsx";

const SideBar = () => {
    const {data, error} = UseNotionData();

    return (
        <>
            <Box w={'auto'}>
                {data?.map((item: any, index: number) => (
                    <Card key={index} p={2} borderBottom="1px solid #ddd" style={{boxShadow: "none"}}>
                        {item?.properties?.categoryTitle?.title?.[0]?.plain_text || 'No Title'}
                    </Card>
                ))}
            </Box>
        </>
    );
};

export default SideBar;