import axiosInstance from "./axiosInstance";

const getAllDanhGia = async () => {
    return await axiosInstance.get(`/danhgia`);
};

const getDanhGiaSp = async (masp, page = 0, perPage = 10) => {
    return await axiosInstance.get(`/danhgia/${masp}?page=${page}&perPage=${perPage}`);
};

const postDanhGia = async (data) => {
    return await axiosInstance.get(`/danhgia`, data);
};

export default {
    getAllDanhGia,
    getDanhGiaSp,
    postDanhGia,
}