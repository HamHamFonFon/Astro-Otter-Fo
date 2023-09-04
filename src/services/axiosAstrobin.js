import axios from 'axios';
import config from "@/configs/api";

const instance = axios.create({
    baseURL: config.ASTROBIN_API_URL, // Set your API base URL
});

export default instance;