/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from "./axiosInstance";

const addHoaDon = async(data)=>{
    return await axiosInstance.post(`/api/hoa-don`, data)
}

export default {
    addHoaDon
}