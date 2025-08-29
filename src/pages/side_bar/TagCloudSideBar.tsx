import { Box, Tag, Wrap, WrapItem, Text } from '@chakra-ui/react';
import useNotionData from '@hooks/useNotionData.tsx';

interface NotionTag {
    id: string;
    name: string;
    color: string;
}

interface NotionProperties {
    tag: {
        multi_select: NotionTag[];
    };
}

interface NotionPost {
    id: string;
    properties: NotionProperties;
}

interface TagCloudSidebarProps {
    onTagClick: (tag: string | null) => void;
    selectedTag: string | null;
}

export const TagCloudSidebar = ({ onTagClick, selectedTag }: TagCloudSidebarProps) => {
    const { data, loading, error } = useNotionData();

    if (loading) {
        return <Text>Loading tags...</Text>;
    }

    if (error) {
        return <Text>Error loading tags.</Text>;
    }

    const allTags = (data as NotionPost[]).reduce((acc: string[], item: NotionPost) => {
        const tags = item.properties.tag.multi_select.map((tag: NotionTag) => tag.name);
        return [...acc, ...tags];
    }, []);

    const uniqueTags = [...new Set(allTags)];

    return (
        <Box p={4}>
            <Text fontSize="lg" fontWeight="bold" mb={4}>Tags</Text>
            <Wrap spacing={2}>
                <WrapItem>
                    <Tag
                        cursor="pointer"
                        onClick={() => onTagClick(null)}
                        colorScheme={selectedTag === null ? 'blue' : 'gray'}
                    >
                        최근게시글
                    </Tag>
                </WrapItem>
                {uniqueTags.map((tag: string) => (
                    <WrapItem key={tag}>
                        <Tag 
                            cursor="pointer"
                            onClick={() => onTagClick(tag)}
                            colorScheme={selectedTag === tag ? 'blue' : 'gray'}
                        >
                            {tag}
                        </Tag>
                    </WrapItem>
                ))}
            </Wrap>
        </Box>
    );
};
