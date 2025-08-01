import axios from "axios";

export default function NotionApi() {
    const contentApi = async () => {
        const res = await axios.post('https://notion-proxy-api.vercel.app/api/contentList', {
            "databaseId": "21eeca04b9ba80a78b1ef6ac83dc931a"
        })

        return res.data.results;
    };

    const fetchNotionPage = async (pageId: string) => {
        try {
            const response = await fetch(`https://notion-proxy-api.vercel.app/api/getPage?pageId=${pageId}`)
            const data = await response.json()
            return data

        } catch (err) {
            console.error('Failed to fetch Notion page:', err)
            return null
        }
    }

    return {contentApi, fetchNotionPage};
};

