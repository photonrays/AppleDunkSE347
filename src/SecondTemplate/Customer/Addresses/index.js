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
            
                <div className={" my-12"}>
                    <div>
                    {user?.diachinhanhang.map((item, index) => (
                        <AddressItem name={item.ten} email={item.email} sdt={item.sdt} address={item.diachi} id={item._id} key={item._id}></AddressItem>
                    )) || <div className="flex justify-center mb-4">Chưa có địa chỉ nhận hàng</div>}
                    </div>
                    <div className="flex justify-center">
                        <button className="border-2 rounded-lg px-4 py-4 bg-sky-600 text-white">
                            <Link to="/customer/addAddress">Thêm mới địa chỉ nhận hàng</Link>
                        </button>
                    </div>
                </div>
            </div>
       
    );
}

export default Addresses;