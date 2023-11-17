import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import styles from "../Customer.module.css";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import HistoryIcon from '@mui/icons-material/History';
import { blue } from "@mui/material/colors";
import NavTag from "../Components/NavTag";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Orderbilldetail from "../Components/Orderbilldetail";
import GppGoodIcon from '@mui/icons-material/GppGood';
import { useState, useEffect } from 'react';
import HandleApiOrder from '../../../Apis/HandleApiOrder';

function Orderdetail () {
    
    const { id } = useParams();
    const [or, setOrder] = useState();

    //api lấy order theo id
    useEffect(() => {
        HandleApiOrder.getOrderById(id)
        .then((response) => {
            setOrder(response);
            console.log(or)
        })
        .catch((error) => {
            console.log(error);
        });
    },[or]);

    return (
        <div>
            <div className={styles.bg_primary + " flex justify-evenly text-2xl"}>
                <div className={styles.bg_white +" rounded-lg w-1/4 my-12 lg:block hidden"}>
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/info"} spanCss={"mx-6"} spanContent={"Thông tin tài khoản"}
                        aCss={"mx-4 my-4"} setIcon={<PersonIcon sx={{ fontSize: 30 }}></PersonIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/addresses"} spanCss={"mx-4"} spanContent={"Địa chỉ nhận hàng"}
                        aCss={"mx-4 my-4"} setIcon={<LocationOnIcon sx={{ fontSize: 30 }}></LocationOnIcon>} />
                    <NavTag DivCss={styles.bg_blue +" rounded-lg px-4 py-8 mx-6 my-8"} setHref={"/customer/history"} spanCss={"mx-6"} spanContent={"Đơn đặt hàng"}
                        aCss={styles.text_blue} setIcon={<AssignmentIcon sx={{ fontSize: 30, color: blue[700] }}></AssignmentIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/changePassword"} spanCss={"mx-6"} spanContent={"Đổi mặt khẩu"}
                        aCss={"mx-4 my-4"} setIcon={<LockIcon sx={{ fontSize: 30 }}></LockIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/avatar"} spanCss={"mx-6"} spanContent={"Ảnh đại diện"}
                        aCss={"mx-4 my-4"} setIcon={<CropOriginalIcon sx={{ fontSize: 30 }}></CropOriginalIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/productReviews"} spanCss={"mx-6"} spanContent={"Lịch sử đánh giá sản phẩm"}
                        aCss={"mx-4 my-4"} setIcon={<HistoryIcon sx={{ fontSize: 30 }}></HistoryIcon>} />
                    <NavTag DivCss={"px-4 py-8 mb-8"}  setHref={"/customer/baohanh"} spanCss={"mx-6"} spanContent={"Bảo hành"}
                        aCss={"mx-4 my-4"} setIcon={<GppGoodIcon sx={{ fontSize: 30 }}></GppGoodIcon>} />
                </div>
                <div className={"lg:w-2/5 my-12"}>
                    <div className="text-sky-600">
                        <ChevronLeftIcon sx={{ fontSize: 30}}></ChevronLeftIcon>
                        <Link to="/customer/history">Trở lại</Link>
                    </div>
                    <div>
                        {or!==undefined && 
                        <Orderbilldetail order={or}></Orderbilldetail>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Orderdetail;