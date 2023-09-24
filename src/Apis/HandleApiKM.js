import axiosInstance from './axiosInstance';

//GET
const getAllKM = async() => {
    return await axiosInstance.get('/api/khuyenmai/cached');
}

const getKMByID = async(id) =>{
    return await axiosInstance.get(`/api/khuyenmai/${id}`);
}

const getKMByIdCached = async(id) =>{
    return await axiosInstance.get(`/api/khuyenmai/cached/${id}`);
}

const getKMByApdung =async (apdung) => {
    return await axiosInstance.get(`/api/khuyenmai/apdung/${apdung}`);
}

const getKMByMaKM =async (makm) => {
    return await axiosInstance.get(`/api/khuyenmaibyMaKM/${makm}`);
}

const getKMByApdungAndPhanTram= async(apdung, phantramkm , pageSize, page) => {
    return await axiosInstance.get(`/api/khuyenmai/apdung&phantram/${apdung}/${phantramkm}?pageSize=${pageSize}&page=${page}`);
}

//POST
const addKM = async(data) => {
    return await axiosInstance.post("/api/khuyenmai", data);
}

//PUT
const updateKM = async(id,data) => {
    return await axiosInstance.put(`/api/khuyenmai/${id}`, data);
}

const updateDecreaseSL = async(id)=> {
    return await axiosInstance.put(`/api/khuyenmai/apdung/${id}`);
}

//DELETE
const deleteKM = async(id) => {
    return await axiosInstance.delete(`/api/khuyenmai/${id}`);
}

export default {
    getAllKM,
    getKMByID,
    getKMByMaKM,
    getKMByApdung,
    getKMByApdungAndPhanTram,
    addKM,
    updateKM,
    updateDecreaseSL,
    deleteKM,
    getKMByIdCached
};