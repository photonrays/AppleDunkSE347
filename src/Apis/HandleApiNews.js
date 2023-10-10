/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from "./axiosInstance";

const getAllNews = async (page = 1, pageSize = 10, category = null) => {
    let query = `/api/tin-tuc?page=${page}&pageSize=${pageSize}`;
    if (category) {
        query = query.concat(`&category=${category}`)
    }
    return await axiosInstance.get(query);
};

const getNewsById = async (id) => {
    let query = `/api/tin-tuc/${id}`;
    return await axiosInstance.get(query);
};


export default {getAllNews, getNewsById};

