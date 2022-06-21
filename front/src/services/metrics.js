import { Axios } from './axios';

export const getMetrics = async () => {
    try {
        const { data } = await Axios.get(`/metrics`);
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getTime = async () => {
    try {
        const { data } = await Axios.get(`/time`);
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};
