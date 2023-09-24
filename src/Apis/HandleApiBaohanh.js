import axiosInstance from './axiosInstance';

//GET
const getAllBH = async() => {
    return await axiosInstance.get(`/api/baohanh`);
}

const getBHByID = async(id) => {
    return await axiosInstance.get(`/api/baohanh/${id}`);
}

const getBHBySDT = async(sdt) => {
    return await axiosInstance.get(`/api/baohanh/sdt/${sdt}`);
}

const getBHByMaKH = async(makh, pageSize, currentPage) => {
    return await axiosInstance.get(`/api/baohanh/kh/${makh}?pageSize=${pageSize}&page=${currentPage}`);
}

//POST
const addBH = async(data) => {
    return await axiosInstance.post(`/api/baohanh`,data);
}

const addCTBH = async(id,data) => {
    return await axiosInstance.put(`/api/baohanh/ctbh/${id}`,data);
}

//PUT
const updateBH = async(id,data) => {
    return await axiosInstance.put(`/api/baohanh/${id}`,data);
}

const updateCTBH = async(id,ctbhId,data) => {
    return await axiosInstance.put(`/api/baohanh/ctbh/${id}/${ctbhId}`,data);
}

//DELETE
const deleteBH = async(id) => {
    return await axiosInstance.delete(`/api/baohanh/${id}`);
}

const deleteCTBH = async(id,ctbhId) => {
    return await axiosInstance.delete(`/api/baohanh/${id}/${ctbhId}`);
}

export default {
    getAllBH,
    getBHByID,
    getBHBySDT,
    getBHByMaKH,
    addBH,
    addCTBH,
    updateBH,
    updateCTBH,
    deleteBH,
    deleteCTBH
}
