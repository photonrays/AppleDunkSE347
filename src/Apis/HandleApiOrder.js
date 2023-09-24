/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from "./axiosInstance";

const getAllOrders = async(makh, pagesize = 5 ,currentPage = 0)=>{
    return await axiosInstance.get(`/api/don-hang?makh=${makh}&pageSize=${pagesize}&page=${currentPage}`)
}

const getOrderById = async(id)=>{
    return await axiosInstance.get(`/api/don-hang/${id}`);
}

const getOrderByTransId = async(id)=>{
    return await axiosInstance.get(`/api/don-hang/transid/${id}`);
}

const addOrder = async (data) => {
    return await axiosInstance.post(`/api/don-hang`, data);
};

const updateDonHang = async(madh, data)=>{
    return await axiosInstance.put(`/api/don-hang/${madh}`, data);
}

export default{
    getAllOrders,
    getOrderById,
    getOrderByTransId,
    addOrder,
    updateDonHang,
}