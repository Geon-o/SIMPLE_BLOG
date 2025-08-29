import axios from "axios";

export default function NotionApi() {
    const recentPostApi = async () => {
        const res = await axios.post('https://notion-proxy-api.vercel.app/api/recentPostList')

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

    return {recentPostApi, fetchNotionPage};
};

