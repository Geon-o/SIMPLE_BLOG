import axios from "axios";

export const getNotionData = async () => {
    const res = await axios.get('https://notion-proxy-api.vercel.app/api/notion')

    return res.data.results;
};
