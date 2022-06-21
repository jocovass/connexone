import axios from 'axios';

export const Axios = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
    },
});
