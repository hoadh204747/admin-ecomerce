import axios from 'axios';

//axios.defaults.withCredentials = true;
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export const get = async (path, option={}) => {
    const response = await httpRequest.get(path, option);
    return response.data;
}

export const post = async (path, data, option = {}) => {
    const response = await httpRequest.post(path, data, option);
    return response.data;
}

export const put = async (path, data, option = {}) => {
    const response = await httpRequest.put(path, data, option);
    return response.data;
}

export const remove = async (path, option = {}) => {
    const response = await httpRequest.delete(path, option);
    return response.data;
}

export default httpRequest;