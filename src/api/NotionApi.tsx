import axios from "axios";

export default function NotionApi() {
    const contentApi = async () => {
        const res = await axios.post('https://notion-proxy-api.vercel.app/api/contentList', {
            "databaseId": "21eeca04b9ba80a78b1ef6ac83dc931a"
        })

        return res.data.results;
    };

    return {contentApi};
};

