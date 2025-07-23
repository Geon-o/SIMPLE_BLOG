import React, {useEffect, useState} from 'react'
import NotionApi from "@/api/NotionApi.tsx";
import {Heading} from "@chakra-ui/react";

export default function NotionPageView(pageId) {
    const [pageData, setPageData] = useState(null)
    const {fetchNotionPage} = NotionApi();

    useEffect(() => {
        const getData = async () => {
            const data = await fetchNotionPage(pageId)
            setPageData(data)
        }
        getData()
    }, [pageId])

    function renderBlock(block: any) {
        const {type, id} = block;

        const value = block[type];

        switch (type) {
            case 'heading_1':
                return <Heading as="h1" key={id}>{value.rich_text?.[0]?.plain_text}</Heading>;
            case 'heading_2':
                return <Heading as="h2" key={id}>{value.rich_text?.[0]?.plain_text}</Heading>;
            case 'heading_3':
                return <Heading as="h3" key={id}>{value.rich_text?.[0]?.plain_text}</Heading>;
            case 'paragraph':
                return <p key={id}>{value.rich_text?.[0]?.plain_text}</p>;
            default:
                return <div key={id}>❓ {type} 타입 미지원</div>;
        }
    }

    if (!pageData) return <div>Loading...</div>

    return (
        <div>
            {pageData.blocks?.results?.map(block => renderBlock(block))}
        </div>
    )
}