/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from "./axiosInstance";

const getAllProduct = async (loaisanpham, page, pageSize, phanloai = null, sortOrder = null) => {
    var query = `/api/product?loaisanpham=${loaisanpham}&page=${page}&pageSize=${pageSize}`;
    if (phanloai) {
        query += `&phanloai=${phanloai}`
    }
    if (sortOrder) {
        query += `&sortOrder=${sortOrder}`
    }
    return await axiosInstance.get(query);
};

const getAllSubCategory = async (loaisanpham) => {
    return await axiosInstance.get(`/api/product/subcategory/${loaisanpham}`);
}

const getProductById = async (id)=>{
    return await axiosInstance.get(`/api/product/${id}`);
}

const getProductByName = async (name) => {
    return await axiosInstance.get(`/api/product?tensanpham=${name}`);
}

export default {
    getAllProduct,
    getAllSubCategory,
    getProductById,
    getProductByName
};