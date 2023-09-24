import styles from "../Customer.module.css";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import HistoryIcon from '@mui/icons-material/History';
import { blue } from "@mui/material/colors";
import NavTag from "../Components/NavTag";
import GppGoodIcon from '@mui/icons-material/GppGood';
import { useParams } from 'react-router-dom'
import BaohanhDetailItem from "../Components/BaohanhDetailItem";
import HandleApiBaohanh from "../../../Apis/HandleApiBaohanh";
import HandleApiProduct from "../../../Apis/HandleApiProduct";
import { useEffect, useState } from "react";

function BaohanhDetail () {
    //lấy id của bảo hành trên params
    const { id } = useParams();

    const [data, setData] =useState();
    const [product, setProduct] = useState();

    useEffect(() => {
        //lấy chi tiết bảo hành
        HandleApiBaohanh.getBHByID(id)
        .then((res) => {
            setData(res);
            //lấy thông tin sản phẩm
            HandleApiProduct.getProductById(res.masp)
            .then((res)=>{
                setProduct(res);
            })
            .catch((er)=>{
                console.log(er);
            })
        });
    },[]); 

    return (
        <div>
            <div className={styles.bg_primary + " flex justify-evenly text-2xl"}>
                <div className={styles.bg_white +" rounded-lg w-1/4 my-12 lg:block hidden"}>
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/info"} spanCss={"mx-6"} spanContent={"Thông tin tài khoản"}
                        aCss={"mx-4 my-4"} setIcon={<PersonIcon sx={{ fontSize: 30 }}></PersonIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/addresses"} spanCss={"mx-4"} spanContent={"Địa chỉ nhận hàng"}
                        aCss={"mx-4 my-4"} setIcon={<LocationOnIcon sx={{ fontSize: 30 }}></LocationOnIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/history"} spanCss={"mx-6"} spanContent={"Đơn đặt hàng"}
                        aCss={"mx-4 my-4"} setIcon={<AssignmentIcon sx={{ fontSize: 30 }}></AssignmentIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/changePassword"} spanCss={"mx-6"} spanContent={"Đổi mặt khẩu"}
                        aCss={"mx-4 my-4"} setIcon={<LockIcon sx={{ fontSize: 30 }}></LockIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/avatar"} spanCss={"mx-6"} spanContent={"Ảnh đại diện"}
                        aCss={"mx-4 my-4"} setIcon={<CropOriginalIcon sx={{ fontSize: 30 }}></CropOriginalIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/productReviews"} spanCss={"mx-6"} spanContent={"Lịch sử đánh giá sản phẩm"}
                        aCss={"mx-4 my-4"} setIcon={<HistoryIcon sx={{ fontSize: 30 }}></HistoryIcon>} />
                    <NavTag DivCss={styles.bg_blue +" rounded-lg px-4 py-8 mx-6 my-8  mb-8"}  setHref={"/customer/baohanh"} spanCss={"mx-6"} spanContent={"Bảo hành"}
                        aCss={styles.text_blue} setIcon={<GppGoodIcon sx={{ fontSize: 30, color: blue[700] }}></GppGoodIcon>} />
                </div>
                <div className={"lg:w-2/5 my-12"}>

                    <div className={styles.bg_white +" rounded-lg w-full my-4 drop-shadow-lg"}>
                        <div className="px-4 py-4">
                                <strong className="my-3">{product?.tensanpham || ""}</strong>
                                <p className="my-3">Ngày mua: {data?.thoigian}</p>
                                <p className="my-3">Ngày hết hạn bảo hành: {data?.nghethan}</p>
                        </div>
                    </div>
                    <div className="text-center text-3xl my-5">
                        <h1><b>Thông tin các lần bảo hành</b></h1>
                    </div>
                    <div>
                    {data !== undefined ? (
                        data.chitietbaohanh.length > 0 ? (
                            data.chitietbaohanh.map((item) => (
                            <BaohanhDetailItem
                                lanthu={item.lanthu}
                                ngbaohanh={item.ngbaohanh}
                                mota={item.mota}
                                tinhtrangbaohanh={item.tinhtrangbaohanh}
                                key={item._id}
                            />
                            ))
                        ) : (
                            <div className="flex justify-center">Sản phẩm chưa bảo hành lần nào</div>
                        )
                        ) : null}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BaohanhDetail;