/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from "./axiosInstance";

const getAllStore = async () => {
    return await axiosInstance.get(`api/store`);
};

const getAllStoreCached = async () => {
    return await axiosInstance.get(`api/store/cached`); // add cached
};

const getStoreByDistrict = async (code) => {
    return await axiosInstance.get(`api/store/district?code=${code}`);
};

const getStoreByProvince = async (code) => {
    return await axiosInstance.get(`api/store/province?code=${code}`);
};

export default {
    getAllStore,
    getStoreByDistrict,
    getStoreByProvince,
    getAllStoreCached
};
