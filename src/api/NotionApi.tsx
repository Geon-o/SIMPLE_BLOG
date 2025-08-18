import axios from "axios";

export default function NotionApi() {
    const recentPostApi = async () => {
        const res = await axios.post('https://notion-proxy-api.vercel.app/api/recentPostList', {
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

    const contentByCategoryApi = async (category: string) => {
        const res = await axios.post('https://notion-proxy-api.vercel.app/api/contentByCategory', {
            "databaseId": "253eca04b9ba803d8651cea9b8e4b09d",
            "category": category
        })
        return res.data.results;
    };

    const categoryListApi = async () => {
        const res = await axios.post('https://notion-proxy-api.vercel.app/api/categoryList', {
            "databaseId": "253eca04b9ba803d8651cea9b8e4b09d"
        })
        return res.data.results;
    };

    const subCategoryListApi = async () => {
        const res = await axios.post('https://notion-proxy-api.vercel.app/api/subCategoryList', {
            "databaseId": "253eca04b9ba8097b08cde799bed10dc",
        })
        return res.data.results;
    };

    return {recentPostApi, fetchNotionPage, categoryListApi, subCategoryListApi};
};

