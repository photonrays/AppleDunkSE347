import { Link } from "react-router-dom";
import styles from "../Customer.module.css";
import React from 'react';
import { useState, useEffect } from "react";
import HandleApiProduct from "../../../Apis/HandleApiProduct";

export default ({id, name, ngmua, nghethan})=>{
    const dateParts = nghethan.split('/');
    const year = dateParts[2];
    const month = dateParts[1] - 1; // Trừ 1 vì tháng trong đối tượng Date được tính từ 0 đến 11
    const day = dateParts[0];
    const dateObject = new Date(year, month, day);

    const currentDate = new Date();

    const [product, setProduct] = useState();

    //lấy thông tin sản phẩm
    useEffect(()=>{
        HandleApiProduct.getProductById(name)
        .then((res)=>{
            setProduct(res);
        })
    },[])
    
    return (
        <div className={styles.bg_white +" rounded-lg w-full my-4 drop-shadow-lg"}>
            <div className="px-4 py-4 relative">
                <strong className="my-3">{product?.tensanpham || ""}</strong>
                <p className="my-3">Ngày mua: {ngmua}</p>
                <p className="my-3">Ngày hết hạn: {nghethan}</p>
                <div className="text-end my-3">
                    <Link to={{ pathname: `/customer/baohanh/detail/${id}` }} className="text-sky-600">Xem chi tiết</Link>
                </div>

                {(()=>{
                    if (dateObject < currentDate) 
                        return(
                            <div className="w-fit rounded-lg px-4 py-4 mx-3 my-3 bg-rose-600 absolute top-0 right-0">
                                <label className="text-white">Hết hạn</label>
                            </div>
                        );
                    else 
                        return (
                            <div className="w-fit rounded-lg px-4 py-4 mx-3 my-3 bg-green-500 absolute top-0 right-0">
                                <label className="text-white">Còn hạn</label>
                            </div>
                        );
                })()}
            </div>
        </div>
    )
}