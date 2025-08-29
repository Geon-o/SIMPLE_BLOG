import {useEffect, useState} from 'react';
import {NotionRenderer} from 'react-notion-x';
import {useLocation} from 'react-router-dom';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';
import {Code} from 'react-notion-x/build/third-party/code';
import {Collection} from 'react-notion-x/build/third-party/collection';
import {Equation} from 'react-notion-x/build/third-party/equation';
import NotionApi from "@/api/NotionApi.tsx";
import {Spinner, Box} from "@chakra-ui/react";

export const DetailContentViewPage = () => {
    const [recordMap, setRecordMap] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const {fetchNotionPage} = NotionApi();

    useEffect(() => {
        const pageId = location.state?.pageId;
        if (pageId) {
            setLoading(true);
            fetchNotionPage(pageId)
                .then((data) => {
                    setRecordMap(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [location.state?.pageId]);

    if (loading) {
        return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><Spinner size="xl"/></Box>;
    }

    return (
        <>
            <style>{`
              .notion-collection-page-properties {
                display: none !important;
              }
              .notion-header {
                display: none !important;
              }
            `}</style>
            <div style={{maxWidth: 768, margin: '0 auto'}}>
                {recordMap && (
                    <NotionRenderer
                        recordMap={recordMap}
                        fullPage={true}
                        darkMode={false}
                        components={{
                            Code,
                            Collection,
                            Equation,
                        }}
                    />
                )}
            </div>
        </>
    );
};


