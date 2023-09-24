/* eslint-disable import/no-anonymous-default-export */
import axiosInstance from "./axiosInstance";

const getCartByMaKH = async (id) => {
    return await axiosInstance.get(`api/cart?makh=${id}`);
};

const addSpToCart = async (data) => {
    return await axiosInstance.post(`api/cart`, data);
};

const updateCart = async (makh, masp, mausac, rom, data) => {
    return await axiosInstance.put(
        `api/cart?makh=${makh}&masp=${masp}&mausac=${mausac}&rom=${rom}`,
        data
    );
};

const deleteSpFromCart = async (makh, masp, mausac, rom) => {
    return await axiosInstance.delete(`api/cart?makh=${makh}&masp=${masp}&mausac=${mausac}&rom=${rom}`);
};

const deleteAllSp = async (makh) => {
    return await axiosInstance.delete(`api/cart/deleteAll?makh=${makh}`);
};  

export default {
    getCartByMaKH,
    addSpToCart,
    updateCart,
    deleteSpFromCart,
    deleteAllSp
};
