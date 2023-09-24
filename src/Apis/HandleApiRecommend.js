/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from "./axiosInstance";

const getRecommends = async (makh) => {
    return await axiosInstance.get(`api/recommend?makh=${makh}&soluong=10`);
};


export default {
    getRecommends,
};
