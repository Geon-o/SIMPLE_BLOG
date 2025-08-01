import React, {useEffect, useState} from 'react'
import NotionApi from "@/api/NotionApi.tsx";
import { NotionRenderer } from 'react-notion-x';
import 'react-notion-x/src/styles.css';
import {useLocation} from "react-router-dom";
import {Code} from "react-notion-x/build/third-party/code";
import 'prismjs/themes/prism-tomorrow.css';

export default function NotionPageView() {
    const location = useLocation();
    const pageId = location.state?.pageId;
    const [recordMap, setRecordMap] = useState(null);
    const { fetchNotionPage } = NotionApi();

    useEffect(() => {
        if (pageId) {
            const getData = async () => {
                const data = await fetchNotionPage(pageId);
                setRecordMap(data);
            };
            getData();
        }
    }, [pageId]);

    if (!recordMap) return <div>Loading...</div>;

    return (
        <NotionRenderer
            recordMap={recordMap}
            fullPage={false}
            darkMode={false}
            components={{
                Code: Code,
            }}
        />
    );
}