import axios from "axios";

export const getNotionData = async () => {
    const res = await axios.post('https://notion-proxy-api.vercel.app/api/content', {
        "databaseId": "21eeca04b9ba80a78b1ef6ac83dc931a"
    })

    return res.data.results;
};
