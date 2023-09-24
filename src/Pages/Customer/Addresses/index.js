import { useState, useEffect } from "react";
import styles from "../Customer.module.css";
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LockIcon from '@mui/icons-material/Lock';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import HistoryIcon from '@mui/icons-material/History';
import { blue } from "@mui/material/colors";
import NavTag from "../Components/NavTag";
import AddressItem from "../Components/AddressItem";
import GppGoodIcon from '@mui/icons-material/GppGood';
import HandleApiCustomer from "../../../Apis/HandleApiCustomer";
function Addresses () {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(()=>{
        console.log("gọi GetUserInfor")
        HandleApiCustomer.GetUserInfor()
        .then((res)=>{
            setUser(res.user);
            //lưu vào trong local
            localStorage.setItem('user', JSON.stringify(res.user));
        })
        .catch((e)=>{
            console.log(e);
        })
    },[]);

    return (
        <div>
            <div className={styles.bg_primary + " flex justify-evenly text-2xl"}>
                <div className={styles.bg_white +" rounded-lg w-1/4 my-12 lg:block hidden"}>
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/info"} spanCss={"mx-6"} spanContent={"Thông tin tài khoản"}
                        aCss={"mx-4 my-4"} setIcon={<PersonIcon sx={{ fontSize: 30 }}></PersonIcon>} />
                    <NavTag DivCss={styles.bg_blue +" rounded-lg px-4 py-8 mx-6 my-8"} setHref={"#"} spanCss={"mx-4"} spanContent={"Địa chỉ nhận hàng"}
                        aCss={styles.text_blue} setIcon={<LocationOnIcon sx={{ fontSize: 30, color: blue[700] }}></LocationOnIcon>} />
                    <NavTag DivCss={"px-4 py-8"} setHref={"/customer/history"} spanCss={"mx-6"} spanContent={"Đơn đặt hàng"}
                        aCss={"mx-4 my-4"} setIcon={<AssignmentIcon sx={{ fontSize: 30 }}></AssignmentIcon>} />
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
                    <div>
                    {user?.diachinhanhang.map((item, index) => (
                        <AddressItem name={item.ten} email={item.email} sdt={item.sdt} address={item.diachi} id={item._id} key={item._id}></AddressItem>
                    )) || <div className="flex justify-center mb-4">Chưa có địa chỉ nhận hàng</div>}
                    </div>
                    <div className="flex justify-center">
                        <button className="border-2 rounded-lg px-4 py-4 bg-sky-600 text-white">
                            <Link to="/customer/addAddress">Thêm mới</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addresses;